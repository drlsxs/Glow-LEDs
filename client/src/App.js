import React from 'react';
import { Route, Link, BrowserRouter } from "react-router-dom";
import './App.css';
import { HomePage, ProductPage, CartPage, SignInPage, RegisterPage, ProductsPage, ShippingPage, PaymentPage, PlaceOrderPage, OrderPage, ProfilePage, OrdersPage } from './pages/index'
import { Header, Container, Section } from './components/ContainerComponents/index'
// import HomePage from './pages/HomePage'
// import ProductPage from './pages/ProductPage'
// import CartPage from './pages/CartPage'
// import SignInPage from './pages/SignInPage'
// import RegisterPage from './pages/RegisterPage'
import { useSelector } from 'react-redux';
// import ProductsPage from './pages/ProductsPage';
// import ShippingPage from './pages/ShippingPage';
// import PaymentPage from './pages/PaymentPage';
// import PlaceOrderPage from './pages/PlaceOrderPage';
// import OrderPage from './pages/OrderPage';
// import ProfilePage from './pages/ProfilePage';
// import OrdersPage from './pages/OrdersPage';



function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header userInfo={userInfo} />
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>
            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <Container>
          <Section className="content">
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/category/:id?" component={HomePage} />
            <Route path="/" exact={true} component={HomePage} />
          </Section>

        </Container>
        <footer className="footer">
          All right reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App; 
