import React from 'react'
import Hero from '../components/sections/Hero'
import FeaturesTiles from './sections/FeaturesTiles'
import FeaturesSplit from './sections/FeaturesSplit'
import Testimonial from './sections/Testimonial'
import Cta from './sections/Cta'
import Header from './layout/Header'
import Footer from './layout/Footer'
import WaveBorder from './elements/WaveBorder'

const LandingPage = () => {
  return (
    <>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        <Hero className="illustration-section-01" />
        <WaveBorder />
        {/* <FeaturesTiles /> */}
        <FeaturesSplit
          invertMobile
          topDivider
          imageFill
          className="illustration-section-02"
        />
        <Testimonial topDivider />
        <Cta split />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
