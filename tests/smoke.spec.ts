import { test, expect } from "@playwright/test";

// No credentials, production data, or outbound actions. Remote task artwork is
// fulfilled locally so synthetic todo IDs never reach the image provider.
const imageFixture = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGP4DwQACfsD/fteaysAAAAASUVORK5CYII=",
  "base64",
);
let runtimeErrors: string[];
let unexpectedRequests: string[];

test.beforeEach(async ({ page }, testInfo) => {
  runtimeErrors = [];
  unexpectedRequests = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    // Chromium reports the deliberately navigated 404 document as a console
    // resource error. Exclude only this annotated document; all other errors fail.
    const expectedDocument404 = testInfo.annotations.some((annotation) =>
      annotation.type === "expected-document-404" &&
      message.location().url === `http://127.0.0.1:4173${annotation.description}` &&
      message.text() === "Failed to load resource: the server responded with a status of 404 (Not Found)",
    );
    if (message.type() === "error" && !expectedDocument404) runtimeErrors.push(message.text());
  });
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    const imageSource = url.searchParams.get("url");
    if (
      url.hostname === "picsum.photos" ||
      (url.pathname === "/_next/image" && imageSource?.startsWith("https://picsum.photos/"))
    ) {
      await route.fulfill({ status: 200, contentType: "image/png", body: imageFixture });
    } else if (url.origin === "http://127.0.0.1:4173") {
      await route.continue();
    } else {
      unexpectedRequests.push(`${route.request().method()} ${url.origin}${url.pathname}`);
      await route.abort();
    }
  });
});

test.afterEach(() => {
  expect(runtimeErrors, "browser runtime and hydration errors").toEqual([]);
  expect(unexpectedRequests, "unexpected external requests").toEqual([]);
});

test("unknown routes return 404", {
  annotation: { type: "expected-document-404", description: "/ci-smoke-missing-route" },
}, async ({ page }, testInfo) => {
  const response = await page.goto("/ci-smoke-missing-route");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "This page could not be found.", exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("not-found.png"), fullPage: true, animations: "disabled" });
});

test("portfolio hydrates and section navigation works", async ({ page }, testInfo) => {
  const missingAvatarRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/avatar.jpg") missingAvatarRequests.push(request.url());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Hi, I’m Your Name", exact: true })).toBeVisible();
  await expect(page.getByText("ES", { exact: true })).toBeVisible();
  const testimonialInitials = page.getByText("CL", { exact: true });
  await expect(testimonialInitials).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(testimonialInitials.nth(index)).toBeVisible();
  }
  const thirdProjectArtwork = page.getByRole("img", { name: "Proj3", exact: true });
  await expect(thirdProjectArtwork).toBeVisible();
  await expect(thirdProjectArtwork).toHaveCSS("filter", "invert(1)");
  await expect(page.getByRole("img", { name: "Proj1", exact: true })).toHaveCSS("filter", "none");
  await expect(page.getByRole("img", { name: "Proj2", exact: true })).toHaveCSS("filter", "none");
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true, animations: "disabled" });
  await page.locator("nav").getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("heading", { name: "My Work", exact: true })).toBeVisible();
  await page.locator("nav").getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("link", { name: "Send Me an Email" })).toBeVisible();
  expect(missingAvatarRequests, "missing placeholder avatar must not be requested").toEqual([]);
});
