import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import CheckoutButton from './CheckoutButton'
//import CheckoutScreen from './CheckoutScreen'

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`bg-lime-500 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:scale-105 transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default function KairoWebsite() {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate() // dùng để chuyển hướng đến CheckoutScreen

  const products = [
    {
      title: 'One-Time Purchase',
      details: '1 Pack (15 Gummies)',
      price: '£12.00',
      shipping: '£3.70',
      label: 'Add to Cart',
      path: '/checkout',
      img: '/images/gummies-layout-c.jpg',
      priceId: 'price_1RutaX2KR77tcshFsuESJYmX',
    },
    {
      title: '4-Pack Bundle',
      details: '4 Packs (60 Gummies)',
      price: '£40.00',
      shipping: '£5.15',
      label: 'Add to Cart',
      path: '/checkout',
      img: '/images/hero.jpg',
      priceId: 'price_1RutbK2KR77tcshFAPvMrkxi',
    },
    {
      title: 'Monthly Subscription',
      details: '4 Packs every month',
      price: '£40.00/mo',
      shipping: '£5.15',
      label: 'Subscribe & Save',
      path: '/checkout',
      img: '/images/gummies-layout-a.jpg',
      priceId: 'price_1Rutcw2KR77tcshFFCwhR1b5',
      isSubscription: true,
    },
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false)
      } else {
        // Scrolling up
        setShowHeader(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  return (
    <>
      <div className="font-garamond text-gray-900 bg-white min-h-screen">
        <header
          className={`fixed top-0 left-0 z-50 w-full bg-white shadow transition-transform duration-500 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Logo – căn giữa (mobile) hoặc trái (desktop) */}
          <div className="absolute top-[2px] left-1/2 transform -translate-x-1/2 z-20 md:left-6 md:transform-none">
            <img
              src="/images/kairo-logo.png"
              alt="Kairo Logo"
              className="h-20 w-auto drop-shadow-xl"
            />
          </div>

          {/* Top Green Bar – có icon social */}
          <div className="flex items-center justify-between px-4 py-2 bg-lime-400 relative">
            {/* Hamburger menu (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="block md:hidden text-black z-30"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Social icons */}
            <div className="flex gap-3 ml-auto z-30">
              {[
                { href: 'https://facebook.com', icon: '/icons/facebook.svg' },
                { href: 'https://instagram.com', icon: '/icons/instagram.svg' },
                { href: 'https://tiktok.com', icon: '/icons/tiktok.svg' },
              ].map(({ href, icon }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
                >
                  <img src={icon} className="w-4 h-4 filter-green" />
                </a>
              ))}
            </div>
          </div>

          {/* White Nav Row */}
          <div className="flex items-center justify-center px-4 py-5 bg-white md:py-2">
            <nav className="hidden md:flex gap-20 text-xl font-bold text-lime-400">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Ingredients', href: '#ingredients' },
                { label: 'Shop', href: '#shop' },
                { label: 'Our Mission', href: '#ourmission' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="hover:text-black transition">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* MOBILE DRAWER – ĐỂ NGOÀI HEADER */}
        {mobileMenuOpen && (
          <>
            {/* Overlay trắng, che toàn bộ trang */}
            <div
              className="fixed inset-0 z-[60] bg-white" // trắng 100%
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <div
              className={`fixed top-0 left-0 z-[70] h-full w-[75%] max-w-sm bg-white shadow-xl p-6 
                  transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button className="text-black mb-6" onClick={() => setMobileMenuOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Nav items */}
              <nav className="flex flex-col gap-4  text-lg font-bold text-black">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Ingredients', href: '#ingredients' },
                  { label: 'Shop', href: '#shop' },
                  { label: 'Our Mission', href: '#ourmission' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:text-lime-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Social */}
              <div className="flex justify-start gap-4 pt-6">
                {[
                  { href: 'https://facebook.com', icon: '/icons/facebook.svg' },
                  { href: 'https://instagram.com', icon: '/icons/instagram.svg' },
                  { href: 'https://tiktok.com', icon: '/icons/tiktok.svg' },
                ].map(({ href, icon }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center hover:scale-110 transition"
                  >
                    <img src={icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        <section
          id="home"
          className="relative h-[100vh] flex items-center justify-center text-center text-white"
        >
          {/* Background Image (Switch between desktop and mobile) */}
          <img
            src={isMobile ? '/images/hero_mobile.png' : '/images/hero.png'}
            alt="Lifestyle Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(1.3) saturate(1.1) contrast(0.97)' }}
          />

          {/* Foreground Button */}
          <div className="relative z-10 flex flex-col items-center mt-[30rem]">
            <a
              href="#shop"
              className="inline-block px-8 py-3 text-white font-extrabold text-lg rounded-full bg-lime-500 shadow-xl hover:scale-105 transition"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              Shop The Gummies
            </a>
          </div>
        </section>

        <section className="bg-white py-16 text-center px-6">
          <div className="relative z-0">
            {/* Big top-left gummy */}
            <img
              src="/images/mango.png"
              className="absolute top-[10%] left-[5%] w-20 md:w-32 rotate-[10deg] opacity-90 animate-float-slow"
            />
            {/* Small top-right gummy */}
            <img
              src="/images/floating-gummies-a.png"
              className="absolute top-[0%] right-[5%] w-12 md:w-40 rotate-[340deg] opacity-80 animate-float-medium"
            />
          </div>

          <div className="flex justify-center mb-12 z-10 relative">
            <img
              src="/images/headline.png"
              alt="Unlock Your Potential, Naturally!"
              className="w-[70%] max-w-[360px]"
            />
          </div>

          <p className="text-lg md:text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Experience the vibrant synergy of nature&apos;s finest ingredients, which has been
            specially selected and sourced by Kairo&apos;s Vegan Sweets. Our Seamoss Mango Gummies
            are more than just a treat; they&apos;re your daily boost of brilliance, crafted to
            sharpen your focus and energize your day, the delicious vegan way!
          </p>
        </section>

        {/* Section 4: Star Ingredients */}
        <section id="ingredients" className="py-16 bg-white relative overflow-hidden">
          {/* Heading */}
          <div className="flex justify-center mb-12 z-10 relative">
            <img
              src="/images/ingredient_headline.png"
              alt="Meet Our Star Ingredients"
              className="w-[70%] max-w-[360px]"
            />
          </div>

          {/* Floating Gummies*/}
          <div className="relative z-0">
            {/* Medium bottom-left gummy */}
            <img
              src="/images/floating-gummies-c.png"
              className="absolute bottom-[10%] left-[6%] w-14 md:w-40 rotate-[20deg] opacity-85 animate-float-fast"
            />

            {/* Large bottom-right gummy */}
            <img
              src="/images/mango_b.png"
              className="absolute bottom-[0%] right-[5%] w-12 md:w-36 rotate-[5deg] opacity-75 animate-float-medium"
            />
          </div>

          {/* Ingredient Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 z-10 relative">
            {[
              {
                img: '/images/sea-moss.jpg',
                title: 'Sea Moss',
                desc: 'Packed with vital nutrients like Vitamin B2, calcium, magnesium, and zinc for daily vitality.',
              },
              {
                img: '/images/bladderwrack.jpg',
                title: 'Bladderwrack',
                desc: 'Remarkable source of iodine and antioxidants.',
              },
              {
                img: '/images/burdock-root.jpg',
                title: 'Burdock Root',
                desc: 'Rich in antioxidants that nourish skin and flush toxins to boost overall wellness.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1.2, delay: index * 0.3 }}
                className="max-w-xs text-center"
              >
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h4 className="font-semibold text-lg mt-4">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Introduction */}
        <section
          className="relative bg-cover bg-center py-16 px-6 text-center"
          style={{ backgroundImage: "url('/images/background.png')" }}
        >
          {/* Overlay for text visibility */}
          <div className="absolute inset-0 bg-black/30 z-0" />

          <div className="relative z-10 text-white">
            <div className="flex justify-center mb-12">
              <img
                src="/images/introduction_headline.png"
                alt="The Power of Nature in Every Bite"
                className="w-[70%] max-w-[360px]"
              />
            </div>

            <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Irish Sea Moss (1600mg), Bladderwrack (1000mg), and Burdock Root (240mg) work together
              for energy, focus, and wellness. Enjoy our signature mango flavor from organic
              extracts.
            </p>
          </div>
        </section>

        {/* Section 5: Product Benefits */}
        <section className="py-20 px-6 bg-white text-center">
          {/* Heading */}
          <div className="flex justify-center mb-12 z-10 relative">
            <img
              src="/images/benefits_headline.png"
              alt="Our Brilliant Minds Focus Gummies"
              className="w-[70%] max-w-[360px]"
            />
          </div>

          <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
            Mental clarity and sustained focus powered by nature. BMF is your tasty partner in
            performance.
          </p>

          <div className="relative z-0">
            {/* 4 big gummies with random positions */}
            <img
              src="/images/floating-gummies-a.png"
              className="absolute top-[5%] left-[10%] w-12 md:w-20 rotate-[10deg] opacity-90 animate-float-slow"
            />
            <img
              src="/images/floating-gummies-b.png"
              className="absolute top-[30%] right-[5%] w-12 md:w-40 rotate-[350deg] opacity-85 animate-float-medium"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Zero Sugar', '100% Vegan', 'Gluten-Free', 'Non-GMO', '15 Gummies Per Pack'].map(
              (item) => (
                <span
                  key={item}
                  className="border rounded-full px-5 py-2 bg-gray-50 shadow-sm text-sm font-medium hover:scale-105 transition"
                >
                  {item}
                </span>
              )
            )}
          </div>

          {/* Product Images with glow effect */}
          <div className="flex justify-center gap-16 items-end relative z-0">
            {['front-pack.png', 'back-pack-qr.png'].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, delay: i * 0.3 }}
                className="relative"
              >
                {/* Glowing circle behind image */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-yellow-100 rounded-full blur-2xl opacity-50 z-0" />
                <img
                  src={`/images/${src}`}
                  alt={`Gummy ${i + 1}`}
                  className="relative z-10 w-52 hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
          <div className="relative z-0">
            <img
              src="/images/mango.png"
              className="absolute bottom-[1%] left-[2%] w-12 md:w-40 rotate-[25deg] opacity-80 animate-float-fast"
            />
            <img
              src="/images/floating-gummies-d.png"
              className="absolute bottom-[1%] right-[1%] w-12 md:w-28 rotate-[5deg] opacity-75 animate-float-medium"
            />
          </div>
        </section>
        {/* Section 6: Shop */}
        <section
          id="shop"
          className="relative bg-cover bg-center py-16 px-6 text-center"
          style={{ backgroundImage: "url('/images/background.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 z-0" />

          {/* Headline */}
          <div className="flex justify-center mb-12 z-10 relative">
            <img
              src="/images/shop_headline.png"
              alt="Get Yours Today & Feel the Difference!"
              className="w-[70%] max-w-[360px]"
            />
          </div>

          {/* Floating gummies (top) */}
          <div className="relative z-0">
            <img
              src="/images/mango.png"
              className="absolute top-[5%] left-[2%] w-12 md:w-28 rotate-[10deg] opacity-90 animate-float-slow"
            />
            <img
              src="/images/floating-gummies-b.png"
              className="absolute top-[30%] right-[2%] w-12 md:w-32 rotate-[350deg] opacity-85 animate-float-medium"
            />
          </div>

          {/* Subtext */}
          <motion.p
            className="text-center text-2xl font-medium text-white mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Choose your path to brilliance.
          </motion.p>

          {/* Product Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-2xl text-center hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                <h4 className="font-bold text-xl text-black">{opt.title}</h4>
                <p className="text-gray-700">{opt.details}</p>
                <p className="text-2xl font-extrabold mt-2">{opt.price}</p>
                <p className="text-sm text-gray-500 mb-4">+ Shipping: {opt.shipping}</p>
                <Button onClick={() => navigate('/checkout', { state: opt })}>{opt.label}</Button>
              </motion.div>
            ))}
          </div>

          {/* Floating gummies (bottom) */}
          <div className="relative z-0">
            <img
              src="/images/floating-gummies-c.png"
              className="absolute bottom-[15%] left-[1%] w-16 md:w-28 rotate-[25deg] opacity-80 animate-float-fast"
            />
            <img
              src="/images/mango_b.png"
              className="absolute bottom-[5%] right-[1%] w-12 md:w-28 rotate-[5deg] opacity-75 animate-float-medium"
            />
          </div>
        </section>
        {/* Section 7: Mission & Community */}
        <section
          id="ourmission"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white"
        >
          <div className="relative z-0">
            {/* 4 big gummies with randomized positions and sizes */}
            <img
              src="/images/floating-gummies-a.png"
              className="absolute top-[8%] left-[2%] w-8 md:w-20 rotate-[15deg] opacity-90 animate-float-medium"
            />
            <img
              src="/images/mango.png"
              className="absolute top-[50%] right-[1%] w-16 md:w-32 rotate-[345deg] opacity-85 animate-float-slow"
            />
          </div>

          {/* Header */}
          <div className="flex justify-center mb-12 z-10 relative">
            <img
              src="/images/our_mission_headline.png"
              alt="Our Mission"
              className="w-[70%] max-w-[360px]"
            />
          </div>

          {/* Paragraph 1 */}
          <motion.p
            className="max-w-5xl mx-auto text-lg text-gray-800 leading-relaxed text-justify mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            At Kairos Vegan Sweets, our mission is to empower wellness through nature, offering
            delicious, nutrient-rich sea moss, bladderwrack and burdock root vitamin sweets gummies
            that support physical vitality and mental clarity. We are committed to providing
            plant-based, ethically sourced supplements that nourish the body from the inside out —
            making holistic health accessible, enjoyable, and sustainable for everyone.
          </motion.p>

          {/* Hero Image */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/gummies-layout-a.jpg"
              alt="Gummies Layout"
              className="w-full max-w-4xl rounded-xl shadow-md"
            />
          </motion.div>

          {/* Paragraph 2 */}
          <motion.p
            className="max-w-5xl mx-auto text-lg text-gray-800 leading-relaxed text-justify mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            With every mango-flavored gummy, we aim to bridge the gap between health and taste —
            using real ingredients, no compromises, and a whole lot of purpose. Because we believe
            that taking care of yourself should feel as good as it tastes. Enjoy us on this journey
            because health is wealth.
          </motion.p>

          <div className="relative z-0">
            {/* 4 big gummies with random positions */}
            <img
              src="/images/floating-gummies-a.png"
              className="absolute top-[5%] left-[10%] w-8 md:w-28 rotate-[10deg] opacity-90 animate-float-slow"
            />
            <img
              src="/images/floating-gummies-b.png"
              className="absolute top-[30%] right-[5%] w-4 md:w-20 rotate-[350deg] opacity-85 animate-float-medium"
            />
            <img
              src="/images/floating-gummies-c.png"
              className="absolute bottom-[15%] left-[5%] w-4 md:w-28 rotate-[25deg] opacity-80 animate-float-fast"
            />
            <img
              src="/images/floating-gummies-d.png"
              className="absolute bottom-[5%] right-[1%] w-8 md:w-36 rotate-[5deg] opacity-75 animate-float-medium"
            />
          </div>

          {/* Slogan */}
          <motion.blockquote
            className="max-w-4xl mx-auto text-center font-semibold text-gray-800 text-lg leading-loose italic border-l-4 border-pink-400 pl-6 mb-14"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            “Wellness You Can Taste. Power You Can Feel. Real Fruit. Real Minerals. Real You. Fuel
            Your Day the Plant-Based Way. From Nature, With Purpose. Where Sweet Meets Strong –
            Naturally. Vegan. Vital. Vibrant. Daily Dose of Health — Made Delicious. One Gummy, 92
            Minerals. Endless Benefits.”
          </motion.blockquote>

          {/* Paragraph 3 */}
          <motion.p
            className="max-w-4xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            A portion of every purchase helps fund our vital health projects for young people in the
            UK and supports building brighter futures in Uganda. With Kairo&apos;s, you&apos;re not
            investing in yourself, you&apos;re investing in community.
          </motion.p>
          {/* Sub-section: App & Competition */}
          <motion.div
            className="mt-16 mb-12 px-6 max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-12 z-10 relative">
              <img
                src="/images/competition_headline.png"
                alt="The How To App & Golden Competition"
                className="w-[70%] max-w-[360px]"
              />
            </div>

            <motion.p
              className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Buy <span className="font-bold text-black">4 packs</span> of our BMF Seamoss Mango
              Gummies for a chance to win a
              <span className="font-bold text-black"> real Gold Coin</span> or a
              <span className="font-bold text-black"> cash alternative</span>! Scanning the QR code
              on your pack also gives you early access to the revolutionary
              <span className="font-bold text-black"> How To App</span>.
            </motion.p>

            <motion.p
              className="text-base sm:text-lg font-semibold text-green-500 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Scan the QR code below to enter the competition and join the waitlist!
            </motion.p>

            <div className="relative z-0">
              {/* 4 big gummies with randomized positions and sizes */}
              <img
                src="/images/floating-gummies-a.png"
                className="absolute top-[8%] left-[2%] w-12 md:w-32 rotate-[15deg] opacity-90 animate-float-medium"
              />
              <img
                src="/images/floating-gummies-b.png"
                className="absolute top-[50%] right-[2%] w-12 md:w-36 rotate-[345deg] opacity-85 animate-float-slow"
              />
            </div>

            {/* QR Image */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/qr-prize.png"
                alt="QR Prize Entry"
                className="w-64 sm:w-72 h-auto rounded-2xl shadow-2xl border border-gray-300 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        </section>

        <footer
          className="relative bg-cover bg-center py-16 px-6 text-white"
          style={{ backgroundImage: "url('/images/background.png')" }}
        >
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            {/* Navigation */}
            <div>
              <h5 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Navigation
              </h5>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Our Ingredients', href: '#ingredients' },
                  { name: 'Shop', href: '#shop' },
                  { name: 'Our Mission', href: '#ourmission' },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-white/80 hover:text-white transition duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h5 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Social
              </h5>
              <a
                href="https://www.tiktok.com/shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white transition duration-300 block"
              >
                Visit our TikTok Shop
              </a>
            </div>

            {/* Legal */}
            <div>
              <h5 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Legal
              </h5>
              <p className="text-sm text-white/60 mb-2">
                © 2025 Kairo&apos;s Vegan Sweet Ltd. All rights reserved.
              </p>
              <a href="#" className="text-sm text-white/80 hover:text-white transition block">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/80 hover:text-white transition block">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
