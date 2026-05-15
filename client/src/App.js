import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Offers from './Pages/offerspage';
import Contact from './Pages/Contact'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import ProductDetail from './Pages/ProductDetail'
const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
        <Route path='/offers' element={<Offers />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
       </Routes>
        <Footer/>
       </BrowserRouter>

    </div>
  )
}

export default App
