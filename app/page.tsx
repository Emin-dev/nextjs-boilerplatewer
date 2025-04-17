import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24 lg:py-32">
          <div className="flex flex-col items-start space-y-6">
            <Badge variant="outline">New & Improved</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
              Experience the Premium Difference
            </h1>
            <p className="text-lg text-muted-foreground">
              Elevate your workflow with our cutting-edge platform, designed for performance, security, and scalability. Join thousands of satisfied customers today.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Get Started Free</Button>
              <Button size="lg" variant="outline">Request Demo</Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
             {/* Placeholder for an image or illustration */}
             <Image
               src="/window.svg" // Example image
               alt="Hero Illustration"
               width={450}
               height={450}
               className="rounded-lg shadow-xl"
            />
          </div>
        </section>

        <Separator />

        {/* Features Section */}
        <section id="features" className="container py-16 md:py-24 lg:py-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Powerful Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need to succeed.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                 <Image src="/file.svg" alt="Feature 1 Icon" width={40} height={40} className="mb-4"/>
                <CardTitle>Feature One</CardTitle>
                <CardDescription>Seamless Integration</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p>Connect effortlessly with your existing tools and workflows.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <Image src="/globe.svg" alt="Feature 2 Icon" width={40} height={40} className="mb-4"/>
                <CardTitle>Feature Two</CardTitle>
                <CardDescription>Advanced Analytics</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p>Gain deep insights into your data with our powerful analytics engine.</p>
              </CardContent>
               <CardFooter>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                 <Image src="/window.svg" alt="Feature 3 Icon" width={40} height={40} className="mb-4"/>
                <CardTitle>Feature Three</CardTitle>
                <CardDescription>24/7 Support</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p>Our dedicated support team is always here to help you succeed.</p>
              </CardContent>
               <CardFooter>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

         <Separator />

        {/* Testimonial Section (Example) */}
         <section className="bg-muted/40 py-16 md:py-24 lg:py-32">
            <div className="container text-center">
                 <h2 className="text-3xl font-bold tracking-tight mb-8">Trusted by Professionals</h2>
                 <div className="grid gap-8 md:grid-cols-3">
                    <Card>
                        <CardHeader className="items-center">
                             <Avatar className="mb-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                             </Avatar>
                             <CardTitle className="text-lg">Sarah Jones</CardTitle>
                             <CardDescription>CEO, TechCorp</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="italic">"This platform transformed how we operate. Highly recommended!"</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center">
                             <Avatar className="mb-2">
                                <AvatarImage src="/placeholder-avatar-2.png" alt="Placeholder" />
                                <AvatarFallback>MJ</AvatarFallback>
                             </Avatar>
                             <CardTitle className="text-lg">Mike Adams</CardTitle>
                             <CardDescription>Lead Developer, Innovate Ltd.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="italic">"Incredible performance and stellar support. A game-changer.""</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="items-center">
                            <Avatar className="mb-2">
                                <AvatarImage src="/placeholder-avatar-3.png" alt="Placeholder"/>
                                <AvatarFallback>LP</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">Lisa Ray</CardTitle>
                            <CardDescription>Project Manager, Solutions Inc.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="italic">"The intuitive design made onboarding our team a breeze."</p>
                        </CardContent>
                    </Card>
                 </div>
            </div>
         </section>

      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
             <Image src="/file.svg" alt="Logo" width={24} height={24} />
             <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js and shadcn/ui.
            </p>
          </div>
           <p className="text-center text-sm text-muted-foreground md:text-right">
             © {new Date().getFullYear()} PremiumApp, Inc. All rights reserved.
           </p>
        </div>
      </footer>
    </div>
  );
}


