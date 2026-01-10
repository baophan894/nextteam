"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white overflow-x-hidden">
      {/* Header Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-orange-100 shadow-lg py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className={`text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-gray-900 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>
              NEXT TEAM
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`transition-all duration-300 font-medium relative group ${scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>
                Home
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-orange-600' : 'bg-white'}`}></span>
              </Link>
              <Link href="#services" className={`transition-all duration-300 font-medium relative group ${scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>
                Services
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-orange-600' : 'bg-white'}`}></span>
              </Link>
              <Link href="/about" className={`transition-all duration-300 font-medium relative group ${scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>
                About us
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-orange-600' : 'bg-white'}`}></span>
              </Link>
              <Link href="#contact" className={`transition-all duration-300 font-medium relative group ${scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>
                Contact
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-orange-600' : 'bg-white'}`}></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-55 px-6 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow animation-delay-100"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight animate-slide-in-left">
                Next Team
              </h1>
              <p className="text-white/90 text-lg leading-relaxed animate-slide-in-left animation-delay-100">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-slide-in-left animation-delay-200">
                <Link
                  href="/privacy"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-white/30"
                >
                  LINK OF PRIVACY
                </Link>
                <Link
                  href="/term"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-white/30"
                >
                  LINK OF TERMS
                </Link>
              </div>
            </div>

            {/* Right Rocket Illustration */}
            <div className="relative animate-fade-in-right flex justify-center">
              <div className="relative w-64 h-80 flex items-center justify-center">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-yellow-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                {/* Rocket Image */}
                <div className="relative z-10 animate-rocket-launch">
                  <Image
                    src="/rocket.png"
                    alt="Rocket"
                    width={250}
                    height={320}
                    className="drop-shadow-2xl animate-float"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator - Bigger */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-40 md:h-50" viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80 L1200,200 L0,200 Z" fill="white" opacity="0.2"/>
            <path d="M0,110 C250,170 450,50 600,110 C750,170 950,50 1200,110 L1200,200 L0,200 Z" fill="white" opacity="0.4"/>
            <path d="M0,140 C300,200 500,80 600,140 C700,200 900,80 1200,140 L1200,200 L0,200 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-orange-600 mb-2 animate-count-up">500+</div>
              <p className="text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-orange-600 mb-2 animate-count-up animation-delay-100">200+</div>
              <p className="text-gray-600 font-medium">Happy Clients</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-orange-600 mb-2 animate-count-up animation-delay-200">50+</div>
              <p className="text-gray-600 font-medium">Team Members</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-orange-600 mb-2 animate-count-up animation-delay-300">10+</div>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-white border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Software Development</h3>
              <p className="text-gray-600 leading-relaxed">Custom software solutions built with modern technologies and best practices.</p>
            </div>
            <div className="p-8 rounded-xl bg-white border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animation-delay-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Consulting</h3>
              <p className="text-gray-600 leading-relaxed">Expert guidance to help you make the right technology decisions for your business.</p>
            </div>
            <div className="p-8 rounded-xl bg-white border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animation-delay-200">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Support & Maintenance</h3>
              <p className="text-gray-600 leading-relaxed">Ongoing support to keep your systems running smoothly and efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies We Master</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cutting-edge tools and frameworks for modern software development
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Firebase', 'Tailwind'].map((tech, index) => (
              <div 
                key={tech} 
                className="flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 transform hover:scale-110 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gray-700 font-semibold group-hover:text-orange-600 transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your vision and requirements' },
              { step: '02', title: 'Design', desc: 'Creating intuitive and beautiful interfaces' },
              { step: '03', title: 'Development', desc: 'Building robust and scalable solutions' },
              { step: '04', title: 'Delivery', desc: 'Launching and supporting your product' }
            ].map((item, index) => (
              <div 
                key={item.step} 
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white p-8 rounded-xl border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-6xl font-bold text-orange-100 mb-4 group-hover:text-orange-200 transition-colors">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Doe', role: 'CEO, Tech Corp', text: 'Next Team delivered exceptional results. Their expertise and dedication transformed our business.' },
              { name: 'Jane Smith', role: 'CTO, Startup Inc', text: 'Professional, responsive, and highly skilled. The best development partner we\'ve worked with.' },
              { name: 'Mike Johnson', role: 'Founder, Digital Co', text: 'Outstanding quality and attention to detail. They exceeded all our expectations.' }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-bounce-slow animation-delay-200"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full animate-bounce-slow animation-delay-100"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-orange-100 animate-fade-in-up animation-delay-100">
            Let's work together to bring your vision to life
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl animate-fade-in-up animation-delay-200"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Next Team</h3>
              <p className="text-gray-400">
                Your trusted partner in software development and digital transformation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="block text-gray-400 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
                <Link href="#services" className="block text-gray-400 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-400 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/term" className="block text-gray-400 hover:text-orange-500 transition-colors">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Next Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
