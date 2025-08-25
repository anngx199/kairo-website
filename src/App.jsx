import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CheckoutScreen from './components/CheckoutScreen'
import KairoWebsite from './components/KairoWebsite'
import Success from './pages/success.jsx'
import Cancel from './pages/cancel.jsx'
import CompletePayment from './pages/CompletePayment.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<KairoWebsite />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/complete" element={<CompletePayment />} />
    </Routes>
  )
}

export default App
