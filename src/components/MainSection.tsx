import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const projectImages = [
  { src: '/placeholder.svg?height=400&width=600', alt: 'Web Design Project' },
  { src: '/placeholder.svg?height=400&width=600', alt: 'Web Development Project' },
  { src: '/placeholder.svg?height=400&width=600', alt: 'Branding Project' },
]

export default function MainSection() {
  return (
    <section id="main" className="pt-24 sm:pt-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Project Images Grid/Slider */}
        <div id="picture-slider" className="mb-8 sm:mb-16">
          {/* Mobile Slider */}
          <div className="sm:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {projectImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3] relative bg-gray-900">
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop/Tablet Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectImages.map((image, index) => (
              <div key={index} className="aspect-[4/3] relative bg-gray-900">
                <Image
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-16 sm:mb-32">
          <div className="text-sm mb-4">(HELLO, IM JUAN CARLOS)</div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8">
            SOFTWARE <span className="font-serif italic font-normal">engineer</span>
            <br className="hidden sm:block" /> MANAGER
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
            <p className="max-w-md text-gray-400">
              Transforming ideas into powerful digital solutions. Specializing in web design,
              development, and branding for businesses that demand excellence.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors"
            >
              Lets collaborate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16 sm:mb-32">
          <p className="max-w-md mb-8 sm:mb-16">
            With over 7 years of experience, I bring your vision to life with cutting-edge designs
            and robust development, creating waves of innovation and success for your brand.
          </p>

          <div className="space-y-4 sm:space-y-6">
            {['WEB DESIGN', 'WEB DEVELOPMENT', 'BRANDING', 'MOBILE APPS'].map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 sm:py-6 border-t border-gray-800"
              >
                <h3 className="text-lg sm:text-xl">{service}</h3>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm hover:text-gray-300"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibition Image */}
        <div className="aspect-[16/9] relative bg-gray-900 mb-16 sm:mb-32">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Project Showcase"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
