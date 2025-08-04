import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CheckoutScreen from './components/CheckoutScreen'
import KairoWebsite from './components/KairoWebsite'

function App() {
  return (
    <Routes>
      <Route path="/" element={<KairoWebsite />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
    </Routes>
  )
}

export default App
