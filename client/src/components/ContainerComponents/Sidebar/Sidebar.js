import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Title, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../index"
import { useSelector } from 'react-redux';
import "./sidebar.css"

const Sidebar = (props) => {

  const header_styles = {
    gridArea: "header",
    backgroundColor: "#333333",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "15px",
    listStyleType: "none",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    position: "fixed",
    right: "0",
    left: "0",
    zIndex: "999"
  }

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  // const closeMenu = () => {
  //   document.querySelector(".sidebar").classList.remove("open")
  // }

  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      {/* <button className="sidebar-close-button" onClick={closeMenu}>x</button> */}
      <FlexContainer column>
        <Link to="/allproducts"><ButtonWord >All Products</ButtonWord></Link>

        <Link to="/category/Diffusers"><ButtonWord >Diffusers</ButtonWord></Link>
        <Link to="/category/Accessories"><ButtonWord >Accessories</ButtonWord></Link>
        <Link to="/contact"><ButtonWord >Contact</ButtonWord></Link>


      </FlexContainer>
    </aside>

  );
}

export default Sidebar;