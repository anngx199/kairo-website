import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import CheckoutButton from './CheckoutButton'

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:scale-105 transition-all duration-300 ease-in-out ${className}`}
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
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm px-10 py-5 flex items-center justify-between">
          <img src="/images/kairo-logo.png" alt="Logo" className="h-20 md:h-24 lg:h-28 w-auto" />

          <nav className="flex-1 flex justify-center gap-16">
            {['Home', 'Ingredients', 'Shop', 'Our Mission'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 hover:opacity-80 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          <CheckoutButton priceId="your_price_id_here">Shop Now</CheckoutButton>
        </header>
        {/* Section 2: Hero Section */}
        <section
          id="home"
          className="relative h-[100vh] flex items-center justify-center text-center text-white"
        >
          <img
            src="/images/gummies-layout-a.jpg"
            alt="Lifestyle Background"
            className="absolute inset-0 w-full h-full object-cover brightness-90 saturate-100"
            style={{ filter: 'brightness(0.93) saturate(1.1) contrast(0.97)' }}
          />
          <div className="relative z-10 max-w-5xl px-6 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-center bg-rainbow bg-clip-text text-transparent">
              <span>
                <Typewriter
                  words={['Unlock Your Potential, Naturally!']}
                  loop={1}
                  typeSpeed={60}
                  deleteSpeed={0}
                  delaySpeed={1000}
                />
              </span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white bg-gradient-to-r from-green-900/60 via-green-200/40 to-yellow-100/30 bg-clip-text text-transparent">
              Experience the vibrant synergy of nature&apos;s finest ingredients with Kairo&apos;s
              Vegan Sweets. Our Seamoss Mango Gummies are more than just a treat; they&apos;re your
              daily boost of brilliance, crafted to sharpen your focus and energize your day, the
              delicious vegan way!
            </p>
            {/* ✅ Headline logo */}
            <img src="/images/kairo-logo-2.png" alt="Kairo Logo" className="h-32 w-auto mx-auto" />
            <a
              href="#shop"
              className="mt-6 inline-block px-8 py-3 text-white font-bold rounded-full text-lg transition bg-gradient-to-r from-pink-400 via-yellow-300 to-green-400 hover:opacity-80"
            >
              Shop The Gummies
            </a>
          </div>
        </section>
        {/* Section 3: Introduction */}
        <section className="py-16 px-6 text-center font-serif bg-white text-gray-800">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
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
        {/* Section 4: Star Ingredients */}
        <section id="ingredients" className="py-16 bg-gray-100 px-6">
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
            className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-500 text-transparent bg-clip-text"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            Get Yours Today & Feel the Difference!
          </motion.h3>

          <motion.p
            className="text-center text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 mb-10"
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
                <h4 className="font-bold text-xl bg-rainbow bg-clip-text text-transparent">
                  {opt.title}
                </h4>
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
              src="/images/hero.jpg"
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
            UK and supports building brighter futures in Uganda. With Kairo&apos;s, you're not just
            investing in yourself, you're investing in community.
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
              Buy <span className="font-bold text-yellow-500">4 packs</span> of our BMF Seamoss
              Mango Gummies for a chance to win a
              <span className="font-bold text-yellow-600"> real Gold Coin</span> or a
              <span className="font-bold text-green-600"> cash alternative</span>! Scanning the QR
              code on your pack also gives you early access to the revolutionary
              <span className="font-bold text-pink-600"> How To App</span>.
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
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
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
