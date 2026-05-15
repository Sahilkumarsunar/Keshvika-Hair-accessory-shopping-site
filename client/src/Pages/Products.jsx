import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../components/Context/ShopContext";
import ProductItem from "./ProductItem";

const Products = () => {
  const { products } = useContext(ShopContext);
  const [exploreSection, setExploreSection] = useState([]);

  useEffect(() => {
    // Guard against undefined and empty array
    if (!products || !Array.isArray(products) || products.length === 0) {
      setExploreSection([]);
      return;
    }

    setExploreSection(products.slice(0, 20));
  }, [products]);

  // Show lightweight loading state until products arrive
  if (!products || !Array.isArray(products)) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>-- ALL PRODUCTS --</h2>
        <p>Loading products…</p>
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          margin: "50px 0px 30px 0px",
          color: "#333",
          fontWeight: "600",
        }}
      >
        -- ALL PRODUCTS --
      </h2>

      <div className="productGrid">
        {exploreSection.map((item, index) => (
          <ProductItem
            key={item.id ?? item._id ?? index}
            id={item.id ?? item._id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
