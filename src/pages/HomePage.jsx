import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Banner from '../components/home/Banner'
import Tools from '../components/home/Tools'
import Review from '../components/home/Review'
import Subscription from "../components/home/Subscription";

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Tools/>
      <Review/>
      <Subscription/>
      <Footer/>
    </div>
  )
}

export default HomePage
