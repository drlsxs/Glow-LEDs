import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { HomePage, AllProductsPage, ProductPage, CartPage, SignInPage, RegisterPage, ProductsPage, ShippingPage, PaymentPage, PlaceOrderPage, OrderPage, ProfilePage, OrdersPage } from './pages/index'
import { Header, Container, Content, Footer } from './components/ContainerComponents/index'
import { useSelector } from 'react-redux';



function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Router>
      <Container>
        <Header userInfo={userInfo} />
        <Content>
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
          <Route path="/category/:id?" component={AllProductsPage} />
          <Route path="/allproducts/:id?" exact={true} component={AllProductsPage} />
          <Route path="/" exact={true} component={HomePage} />
        </Content>
        <Footer />
      </Container>
    </Router>
  );
}

export default App; 
