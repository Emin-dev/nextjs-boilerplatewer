import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'

const SITE_TITLE = 'Your Name – Developer'
const SITE_DESC = 'Full-stack developer specializing in X, Y & Z.'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'your.email@example.com'
const YEAR = new Date().getFullYear()
 
interface NavLink { href: string; label: string }
interface Project {
  title: string
  desc: string
  img: { src: string; alt: string; w: number; h: number }
  tech: string[]
  demo: string
  code: string
}
interface Testimonial { avatar: string; name: string; role: string; quote: string }

const NAV: NavLink[] = [
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
]

const PROJECTS: Project[] = [
  { title: 'Project One',   desc: 'Scope & tech stack.', img: { src: '/file.svg',   alt: 'Proj1', w: 400, h: 300 }, tech: ['A','B'], demo: '#', code: '#' },
  { title: 'Project Two',   desc: 'Scope & tech stack.', img: { src: '/window.svg', alt: 'Proj2', w: 400, h: 300 }, tech: ['C','D'], demo: '#', code: '#' },
  { title: 'Project Three', desc: 'Scope & tech stack.', img: { src: '/vercel.svg', alt: 'Proj3', w: 400, h: 300 }, tech: ['E','F'], demo: '#', code: '#' },
]

const SKILLS = ['JavaScript','TypeScript','React','Next.js','Node.js','Tailwind','SQL','MongoDB','Git','Docker']

const TESTIMONIALS: Testimonial[] = [
  { avatar: '/avatar.jpg', name: 'Client One',   role: 'CEO, Corp',   quote: '“Delivered above expectations.”' },
  { avatar: '/avatar.jpg', name: 'Client Two',   role: 'CTO, Startup', quote: '“Creative and rigorous.”' },
  { avatar: '/avatar.jpg', name: 'Client Three', role: 'Lead, TechOrg',quote: '“Great communicator.”' },
]
 
const Home: NextPage = () => (
  <>
    <Head>
      <title>{SITE_TITLE}</title>
      <meta name="description" content={SITE_DESC} />
      <link rel="canonical" href={BASE_URL} />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content={SITE_DESC} />
    </Head>

    <header role="banner" className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-gray-900">Your Name</Link>
        <nav aria-label="Main" className="flex space-x-6">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                'text-sm font-medium transition-colors',
                'text-gray-600 hover:text-blue-600'
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>

    <main role="main" className="bg-gray-50">
      <section className="container mx-auto grid lg:grid-cols-2 items-center gap-10 px-4 py-24">
        <Avatar className="w-64 h-64 shadow-lg justify-self-center">
          <AvatarImage src="/avatar.jpg" alt="Your Name"/>
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900">Hi, I’m Your Name</h1>
          <p className="text-xl font-medium text-gray-700">Full-Stack Developer</p>
          <p className="text-lg text-gray-600">Passionate about performant web apps.</p>
          <div className="flex space-x-4">
            <Link href="#projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline">Contact Me</Button>
            </Link>
          </div>
        </div>
      </section>
      <Separator className="my-16" />

      <section id="about" className="container mx-auto px-4 py-24 max-w-3xl text-gray-600 leading-relaxed">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">About Me</h2>
        <p>I’m a developer with X years of experience. I love crafting maintainable code.</p>
        <p>I studied CS at … and worked on enterprise & open-source projects.</p>
      </section>
      <Separator className="my-16" />

      <section id="projects" className="bg-gray-100 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">My Work</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map(p => (
              <Card key={p.title} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={p.img.src}
                    alt={p.img.alt}
                    width={p.img.w}
                    height={p.img.h}
                    className="rounded-md object-cover w-full h-48 mb-4"
                    sizes="(min-width:1024px)33vw,(min-width:768px)50vw,100vw"
                    loading="lazy"
                  />
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription>{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {p.tech.map(t => (
                    <Badge key={t} variant="secondary" className="mr-2">{t}</Badge>
                  ))}
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Link href={p.demo}><Button size="sm" variant="outline">Demo</Button></Link>
                  <Link href={p.code}><Button size="sm" variant="outline">Code</Button></Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Separator className="my-16" />

      <section id="skills" className="py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {SKILLS.map(s => <Badge key={s} variant="default">{s}</Badge>)}
        </div>
      </section>
      <Separator className="my-16" />

      <section id="testimonials" className="bg-gray-100 py-24">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {TESTIMONIALS.map(t => (
            <Card key={t.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{t.name}</CardTitle>
                    <CardDescription>{t.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="italic text-gray-700">{t.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Separator className="my-16" />

      <section id="contact" className="py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-8">Have a project in mind? Drop me a message!</p>
        <Link href={`mailto:${EMAIL}`}><Button size="lg">Send Me an Email</Button></Link>
      </section>
    </main>

    <footer role="contentinfo" className="border-t bg-white py-8">
      <div className="container mx-auto flex items-center justify-center px-4">
        <p className="text-sm text-gray-600">&copy; {YEAR} Your Name. All rights reserved.</p>
      </div>
    </footer>
  </>
)

export default Home