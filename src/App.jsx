import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CheckoutScreen from './components/CheckoutScreen'
import KairoWebsite from './components/KairoWebsite'

function App() {
  return (
    <Routes>
      <Route path="/" element={<KairoWebsite />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/success" element={<div className="p-8">Payment successful</div>} />
      <Route path="/cancel" element={<div className="p-8">Payment canceled.</div>} />
    </Routes>
  )
}

export default App
