import React from 'react'
import './ExploreCategory.css'
import { category_list } from '../../assets/assets'

const ExploreCategory = ({category,setCategory}) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Category</h1>
      <p className='explore-category-text'>Discover a world of premium teas, featuring everything from timeless classics to unique, aromatic blends. Sourced with care and crafted for quality, our collection is perfect for tea lovers seeking the ultimate brew. Start your journey to flavorful moments today!</p>
      <div className="explore-category-list">
        {category_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className='explore-category-list-item'>
                    <img className={category===item.category_name?"active":""} src={item.category_image} alt="" />
                    <p>{item.category_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreCategory
