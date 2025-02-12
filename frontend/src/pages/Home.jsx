import React from 'react'
import Header from '../components/Header'
import CategoryMenu from '../components/CategoryMenu'
import TopTrainers from '../components/TopTrainers'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Header/>
        <CategoryMenu/>
        <TopTrainers/>
        <Banner/>
    </div>
  )
}

export default Home