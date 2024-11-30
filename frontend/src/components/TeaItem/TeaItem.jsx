import React, { useContext } from 'react'
import './TeaItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const TeaItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
  return (
    <div className='tea-item'>
        <div className="tea-item-img-container">
            <img className='tea-item-image' src={image} alt="" />
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='tea-item-counter'> 
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="tea-item-info">
            <div className="tea-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="tea-item-desc">{description}</p>
            <p className="tea-item-price">${price}</p>
        </div>
    </div>
  )
}

export default TeaItem
