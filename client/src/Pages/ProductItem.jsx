import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'
import {useContext} from "react";
import { ShopContext } from "../components/Context/ShopContext.jsx";
const ProductItem = ({ id, title, price, image, description }) => {
    const {  setMenu } = useContext(ShopContext);
  return (
      <div>
        <Link to={`/products/${id}`}className="mylink" onClick={() => {
                  setMenu("");
                }}>
         <div className="ProductCard">
        <div className="ProductImage">
          <img src={image} alt={title}/>
        </div>
        <div className="ProductInfo">
          <p>{title}</p>
          <p>{description}</p>
          <p>₹{price}</p>
        </div>
       
         </div>
         
       </Link>
   </div>
  )
}

export default ProductItem
