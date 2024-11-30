import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory'
import TeaDisplay from '../../components/TeaDisplay/TeaDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

    const [category,setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreCategory category={category} setCategory={setCategory}/>
      <TeaDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
