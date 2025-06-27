import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

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
      <div className="font-sans text-gray-900 bg-white min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm px-10 py-5 flex items-center justify-between">
          <img src="/images/kairo-logo.png" alt="Logo" className="h-20 w-auto" />

          <nav className="flex gap-14">
            {['Home', 'Ingredients', 'Shop', 'Our Mission'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 hover:opacity-80 transition"
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white text-base font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition duration-300 ease-in-out">
            Shop Now
          </button>
        </header>

        {/* Hero Section */}
        <section className="py-12 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full rounded-[32px] shadow-xl overflow-hidden flex h-[600px]">
              {/* Hero Image */}
              <div className="relative w-[70%] h-full">
                <img
                  src="/images/hero.jpg"
                  alt="Main Product"
                  className="w-full h-full object-cover"
                  style={{
                    borderTopLeftRadius: '32px',
                    borderTopRightRadius: '32px',
                    borderBottomRightRadius: '32px',
                    borderBottomLeftRadius: '0px',
                  }}
                />

                <button className="absolute bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition">
                  Shop The Gummies
                  <span className="bg-white text-black p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Side Images */}
              <div className="w-[30%] h-full p-4 flex flex-col gap-4">
                {['gummies-layout-b.jpg', 'gummies-layout-c.jpg'].map((img, i) => (
                  <div key={i} className="flex-1 rounded-[20px] overflow-hidden shadow-lg">
                    <img
                      src={`/images/${img}`}
                      alt={`Side ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
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
                <h4 className="font-bold text-xl mb-2">{opt.title}</h4>
                <p className="text-gray-700">{opt.details}</p>
                <p className="text-2xl font-extrabold mt-3">{opt.price}</p>
                <p className="text-sm text-gray-500">+ Shipping: {opt.shipping}</p>
                <Button className="mt-6 w-full">{opt.label}</Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 7: Mission & Community */}
        <section
          id="mission"
          className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white"
        >
          <motion.h3
            className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Win Big & Support a Cause!
          </motion.h3>

          <motion.p
            className="max-w-2xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Each purchase supports{' '}
            <span className="font-semibold text-pink-500">youth health initiatives in the UK</span>{' '}
            and
            <span className="font-semibold text-purple-500"> development projects in Uganda</span>.
          </motion.p>

          <motion.p
            className="max-w-3xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Buy <span className="font-bold text-yellow-500">4 packs</span> for a chance to win a
            <span className="font-bold text-yellow-600"> Gold Coin</span> or
            <span className="font-bold text-green-600"> cash</span>. Scan your pack’s
            <span className="font-semibold text-blue-500"> QR code</span> for a chance to join the
            <span className="font-semibold text-pink-600"> How To App beta!</span>
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/coin-prize-box.jpg"
              alt="Prize Box"
              className="w-60 h-auto rounded-2xl shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300"
            />
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
