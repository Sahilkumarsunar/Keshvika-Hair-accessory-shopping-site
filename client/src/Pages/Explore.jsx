import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import ProductItem from "./ProductItem";
import "./Explore.css";

const Explore = () => {
  const { products } = useContext(ShopContext);
  const [exploreSection, setExploreSection] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return; // ⛔ Prevent crash

    // Safe slicing
    setExploreSection(products.slice(2, 6));
  }, [products]);

  // Prevent rendering until products are available
  if (!products || products.length === 0) {
    return <h3 className="explore">Loading products...</h3>;
  }

  return (
    <div>
      <h2 className="explore">-- Explore Products --</h2>
      <div className="productGrid">
        {exploreSection.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id || item._id}
            image={item.image}
            title={item.title}
            price={item.price}
            Description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
