import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import CheckoutButton from './CheckoutButton'

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`bg-gradient-to-r from-pink-600 via-yellow-500 to-green-600 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:scale-105 transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default function KairoWebsite() {
  return (
    <>
      <div className="font-serif text-gray-900 bg-white min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-6">
          {/* Floating Gummies Background */}
          <img
            src="/images/floating-gummies.png"
            alt="Floating Gummies"
            className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none z-0"
            style={{
              filter: 'contrast(1.2) saturate(1.3)',
            }}
          />

          {/* Header Content */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Logo */}
            <img src="/images/kairo-logo.png" alt="Kairo Logo" className="h-16 w-auto" />

            {/* Navigation */}
            <nav className="flex-1 flex justify-center gap-12">
              <a
                href="#home"
                className="text-3xl font-bold text-blue-600 hover:opacity-80 transition"
              >
                Home
              </a>
              <a
                href="#ingredients"
                className="text-3xl font-bold text-green-600 hover:opacity-80 transition"
              >
                Ingredients
              </a>
              <a
                href="#shop"
                className="text-3xl font-bold text-yellow-600 hover:opacity-80 transition"
              >
                Shop
              </a>
              <a
                href="#ourmission"
                className="text-3xl font-bold text-purple-600 hover:opacity-80 transition"
              >
                Our Mission
              </a>
            </nav>

            {/* Buy Button */}
            <a
              href="#shop"
              className="text-white font-semibold rounded-full px-5 py-2 bg-gradient-to-r from-pink-600 via-yellow-500 to-green-600 shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Buy Now
            </a>
          </div>
        </header>

        <section
          id="home"
          className="relative h-[100vh] flex items-center justify-center text-center text-white"
        >
          {/* Background Image */}
          <img
            src="/images/hero.png"
            alt="Lifestyle Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.93) saturate(1.1) contrast(0.97)' }}
          />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-5xl px-6 flex flex-col items-center mt-[25rem]">
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text mb-4">
              <Typewriter
                words={['Unlock Your Potential, Naturally!']}
                loop={1}
                typeSpeed={60}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
              Experience the vibrant synergy of nature&apos;s finest ingredients with Kairo&apos;s
              Vegan Sweets. Our Seamoss Mango Gummies are more than just a treat; they&apos;re your
              daily boost of brilliance, crafted to sharpen your focus and energize your day, the
              delicious vegan way!
            </p>

            {/* CTA Button */}
            <a
              href="#shop"
              className="inline-block px-8 py-3 text-white font-bold rounded-full text-lg transition bg-gradient-to-r from-pink-600 via-yellow-500 to-green-600 hover:opacity-90 shadow-lg"
            >
              Shop The Gummies
            </a>
          </div>
        </section>

        {/* Section 4: Star Ingredients */}
        <section id="ingredients" className="py-16 bg-white">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
            Meet Our Star Ingredients
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
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
                viewport={{ once: false }} // 👈 enables repeat on scroll
                transition={{ duration: 1.2, delay: index * 0.3 }} // 👈 slower and staggered
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
        <section className="py-16 px-6 text-center font-serif bg-gray-100 text-gray-800">
          <h3
            className="text-4xl font-bold mb-6 bg-gradient-to-rbg-gradient-to-r from-red-500 via-green-500 to-yellow-400
 bg-clip-text text-transparent"
          >
            <Typewriter
              words={['The Power of Nature in Every Bite']}
              loop={1}
              typeSpeed={60}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </h3>

          <p className="max-w-2xl mx-auto">
            Irish Sea Moss (1600mg), Bladderwrack (1000mg), and Burdock Root (240mg) work together
            for energy, focus, and wellness. Enjoy our signature mango flavor from organic extracts.
          </p>
        </section>

        {/* Section 5: Product Benefits */}
        <section className="py-20 px-6 bg-white text-center">
          <h3 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-500 text-transparent bg-clip-text">
            Our Brilliant Minds Focus Gummies
          </h3>

          <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
            Mental clarity and sustained focus powered by nature. BMF is your tasty partner in
            performance.
          </p>

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
        </section>
        {/* Section 6: Shop */}
        <section id="shop" className="py-20 bg-gray-100 px-6">
          {/* Animated Heading */}
          <motion.h3
            className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-red-500 via-green-500 to-yellow-400
 text-transparent bg-clip-text"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            Get Yours Today & Feel the Difference!
          </motion.h3>

          <motion.p
            className="text-center text-lg font-medium text-black mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Choose your path to brilliance.
          </motion.p>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'One-Time Purchase',
                details: '1 Pack (15 Gummies)',
                price: '£12.00',
                shipping: '£3.70',
                label: 'Add to Cart',
              },
              {
                title: '4-Pack Bundle',
                details: '4 Packs (60 Gummies)',
                price: '£40.00',
                shipping: '£5.15',
                label: 'Add to Cart',
              },
              {
                title: 'Monthly Subscription',
                details: '4 Packs every month',
                price: '£40.00/mo',
                shipping: '£5.15',
                label: 'Subscribe & Save',
              },
            ].map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h4 className="font-bold text-xl text-black">{opt.title}</h4>
                <p className="text-gray-700">{opt.details}</p>
                <p className="text-2xl font-extrabold mt-3">{opt.price}</p>
                <p className="text-sm text-gray-500">+ Shipping: {opt.shipping}</p>
                <CheckoutButton priceId="your_price_id_here" className="mt-6 w-full">
                  {opt.label}
                </CheckoutButton>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Section 7: Mission & Community */}
        <section
          id="ourmission"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white"
        >
          {/* Header */}
          <motion.h3
            className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-green-500 bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Mission
          </motion.h3>

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
            <motion.h4
              className="text-3xl sm:text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              The How To App & Golden Competition
            </motion.h4>

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
              className="text-base sm:text-lg font-semibold text-blue-700 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Scan the QR code below to enter the competition and join the waitlist!
            </motion.p>

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

        {/* Section 8: Footer */}
        <footer className="relative bg-gradient-to-t from-gray-900 to-black text-white py-16 px-6 overflow-hidden">
          {/* Clear Floating Gummies */}
          <img
            src="/images/floating-gummies.png"
            alt="Floating Gummies Background"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            style={{ filter: 'brightness(1.3) saturate(1.5) contrast(1.2)' }}
          />

          {/* Content Overlay */}
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Navigation */}
            <div>
              <h5 className="text-lg font-semibold mb-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Navigation
              </h5>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Our Ingredients', href: '#ingredients' },
                  { name: 'Shop', href: '#shop' },
                  { name: 'Our Mission', href: '#mission' },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm hover:text-pink-400 transition duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h5 className="text-lg font-semibold mb-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Social
              </h5>
              <a
                href="https://www.tiktok.com/shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-pink-400 transition duration-300 block"
              >
                Visit our TikTok Shop
              </a>
            </div>

            {/* Legal */}
            <div>
              <h5 className="text-lg font-semibold mb-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Legal
              </h5>
              <p className="text-sm mb-2">
                © 2025 Kairo&apos;s Vegan Sweet Ltd. All rights reserved.
              </p>
              <a href="#" className="text-sm hover:text-pink-400 transition block">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-pink-400 transition block">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
