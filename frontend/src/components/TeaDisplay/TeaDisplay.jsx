import React, { useContext } from 'react'
import './TeaDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import TeaItem from '../TeaItem/TeaItem'

const TeaDisplay = ({category}) => {

    const {tea_list} = useContext(StoreContext)

  return (
    <div className='tea-display' id='tea-display'>
        <h2>Top Tea Picks for You</h2>
        <div className="tea-display-list">
            {tea_list.map((item,index)=>{
                if (category==="All" || category===item.category) {
                    return <TeaItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>                    
                }
            })}
        </div>
    </div>
  )
}

export default TeaDisplay
