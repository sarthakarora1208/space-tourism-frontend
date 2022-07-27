import React from 'react'
import Features from './components/Features'
import Hero from './components/Hero'
import HowItWorks from './components/HowAreWorks'

interface IHomeProps {}

export const Home: React.FC<IHomeProps> = ({}) => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
    </>
  )
}
