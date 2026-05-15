import React, {useContext} from "react";
import Hero from "./Hero/Hero.jsx";
import "./Home.css";
import Explore from "./Explore.jsx";
import { Link } from "react-router-dom";
import { ShopContext } from "../components/Context/ShopContext";

import banner1 from "../components/assets/banner1.jpg";
import banner2 from "../components/assets/banner2.jpg";

const Home = () => { 
    const { menu, setMenu } = useContext(ShopContext);  

  return (
    <div>
      <Hero />
      <Explore />

      <div className="more_btn">
        <Link to="/products">
          <button onClick={() => setMenu("products")}>
            More...
          </button>
        </Link>
      </div>

      <div className="new_launch">

        <Link to="/offers" className="launch_link">
          <div className="new_launch1">
            <img src={banner1} alt="Launch 1" />
          </div>
        </Link>

        <Link to="/offers" className="launch_link">
          <div className="new_launch2">
            <img src={banner2} alt="Launch 2" />
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Home;
