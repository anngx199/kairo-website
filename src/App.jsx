import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Success from './pages/success.jsx'
import Cancel from './pages/cancel.jsx'
import CheckoutScreen from './components/CheckoutScreen'
import KairoWebsite from './components/KairoWebsite'

function App() {
  return (
    <Routes>
      <Route path="/" element={<KairoWebsite />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  )
}

export default App
