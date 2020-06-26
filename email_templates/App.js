module.exports = function (body) {

  return `
  <html lang="en">

<head>
  <meta charset="utf-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#000000">
  <meta name="description" content="Web site created using create-react-app">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <link rel="canonical" href="http://www.glow-leds.com">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Glow LEDs | Diffusers | Accessories | Glow-LEDS.com">
  <meta property="og:description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <meta property="og:url" content="http://www.glow-leds.com">
  <meta property="og:site_name" content="LED Gloves">
  <meta property="og:image"
    content="http://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta property="og:image:secure_url"
    content="http://www.glow-leds.comhttp://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta property="og:image:width" content="1080">
  <meta property="og:image:height" content="1080">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <meta name="twitter:title" content="Glow LEDs | Diffusers | Accessories | Glow-LEDS.com">
  <meta name="twitter:site" content="@glowleds">
  <meta name="twitter:image"
    content="http://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta name="twitter:creator" content="@glowleds">
  <meta property="DC.date.issued" content="2015-04-28T07:34:45+00:00">
  <link rel="shortlink" href="http://www.glow-leds.com">
  <meta name="referrer" content="always">
  <script src="https://kit.fontawesome.com/cc10a71280.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="http://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
  <link rel="stylesheet" href="http://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css"
    media="all">
  <link rel="stylesheet" href="http://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css" media="all">
  <link rel="apple-touch-icon" href="/logo192.png">
  <link rel="manifest" href="/manifest.json">
  <title>Glow LEDs</title>
  <link href="/static/css/main.a02bf091.chunk.css" rel="stylesheet">
  <style>
    html {
      font-size: 62.5%;
      /* 16px * 62.5 = 10px = 1rem */
      box-sizing: border-box;
    }

    /* @font-face {
  font-family: "font";
  src: url("Cocomat Ultralight-trial.ttf");
} */

    @font-face {
      font-family: "button_font";
      src: url("/fonts/Neou-Bold.otf");
    }

    @font-face {
      font-family: "button_font";
      src: url("/fonts/Neou-Bold.otf");
    }

    @font-face {
      font-family: "Helvetica";
      src: url("/fonts/beyond_the_mountains.otf");
    }

    body {
      font: 1.6rem Helvetica;
      /* height: 100vh; */
      margin: 0;
      background-color: #272727;
      color: white;
    }

    input,
    textarea,
    button:focus {
      outline: none;
    }

    button {
      font-size: 1.6rem;
    }

    .full-width {
      width: 100%;
    }

    #root {
      height: 100%;
    }

    ul {
      padding: 0;
    }

    .home_page_img {
      border-radius: 15px;
      object-fit: cover;
      object-position: 50% 50%;
      max-width: 300px;
      max-height: 300px;
      height: auto;
      margin: 10px;
    }

    .grid-container {
      display: flex;
      /* grid-template-areas: "header" "main" "footer";
  grid-template-columns: 1fr;
  grid-template-rows: 16rem 1fr 5rem; */
      height: 100%;
    }

    .brand a {
      color: #ffffff;
      font-size: 3rem;
      font-weight: bold;
      text-decoration: none;
    }

    .header-links a {
      color: #ffffff;
      text-decoration: none;
      padding: 1rem;
    }

    .header-links a:hover {
      background-color: #626262;
    }

    a {
      text-decoration: none;
      color: white;
    }

    /* a:hover {
  background-color: #626262
} */

    /* Sidebar */

    .brand button {
      font-size: 3rem;
      padding: .5rem;
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
    }

    /* Product Details */

    .details {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 1rem;
    }

    .details-image {
      /* flex: 2 1 60rem; */
      margin-right: 20px;
      margin-bottom: 20px;
    }

    /* .details-image {
  flex: 2 1 60rem;
  max-width: 34rem;
  max-height: 34rem;
  border-radius: 15px;
  object-fit: cover;
  object-position: 50% 50%;
  width: 300px;
  height: 300px;
} */

    .details-image img {
      /* max-width: 60rem; */
      /* widows: 100%; */
      border-radius: 15px;
      object-fit: cover;
      object-position: 50% 50%;
      width: 500px;
      height: 500px;
    }

    .details-info {
      flex: 1 1 30rem;
      /* margin-top: 10px; */
    }

    .details-action {
      flex: 1 1 30rem;
    }

    .details-info ul,
    .details-action ul {
      list-style-type: none;
      padding: 0;
    }

    .details-info li,
    .details-action li {
      margin-bottom: 1rem;
    }

    .back-to-result {
      padding: 1rem;
    }

    .details-action {
      border: .1rem #808080 solid;
      border-radius: 0.5rem;
      background-color: #585858;
      padding: 1rem;
    }

    .details-action ul li:last-child {
      display: flex;
      flex-direction: column;
    }

    .button {
      padding: 1rem;
      border: .1rem #808080 solid;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    .button:hover {
      border: .1rem #404040 solid;
    }

    .button.primary {
      background-color: #9e9e9e;
    }

    .button.secondary {
      background-color: #797979;
    }

    .text-center {
      text-align: center;
    }

    /* Cart */

    .cart {
      display: flex;
      flex-wrap: wrap;
      margin: 1rem;
      align-items: flex-start;
    }

    .cart-list {
      flex: 3 1 40rem;
    }

    .cart-action {
      /* flex: 1 1 20rem; */
      /* background-color: #f0f0f0;
  border-radius: .5rem;
  padding: 1rem; */
      border: .1rem #808080 solid;
      border-radius: 0.5rem;
      background-color: #585858;
      padding: 1rem;
    }

    .responsive_table {
      overflow-x: auto;
    }

    .cart-list-container {
      padding: 0;
      list-style-type: none;
      margin-right: 10px;
    }

    .cart-list-container li {
      display: flex;
      justify-content: space-between;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: .1rem #c0c0c0 solid;
    }

    .cart-list-container li img {
      max-width: 10rem;
      max-height: 10rem;
      border-radius: 8px;
      margin-right: 10px;
    }

    .cart-list-container li:first-child {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .cart-image {
      flex: 1 1;
    }

    .cart-name {
      flex: 8 1;
    }

    .cart-price {
      font-size: 2.5rem;
      text-align: right;
    }

    /* form {
  display: flex;
  flex-direction: column;
} */

    .input_i {
      margin: 10px 0px;
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px silver solid;
      /* border: 0px; */
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      /* box-shadow: 1px 1px 10px #555 inset */
      /* outline: none; */
      /* box-shadow: border-box; */
      /* box-shadow: -4px -4px 10px rgba(255, 255, 255, 1), inset 4px 4px 10px rgba(0, 0, 0, 0.2), inset -4px -4px 10px rgba(255, 255, 255, 1), 4px 4px 10px rgba(0, 0, 0, 0.2); */
    }

    textarea {
      resize: none;
      height: 100px;
      font-family: Helvetica;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* forms */

    .form {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      max-width: 32rem;
      padding: 2rem;
      border: .1rem #c0c0c0 solid;
      background-color: #5a5a5a;
      border-radius: .5rem;
      list-style-type: none;
      margin: 0 auto;
    }

    .form-container li {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    input,
    textarea {
      padding: 1rem;
      border: .1rem #c0c0c0 solid;
      border-radius: .5rem;
    }

    /* Products */

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .content-margined {
      margin: 1rem;
    }

    .table {
      width: 100%;
      border-radius: 5px;
      /* overflow-x: auto; */
    }

    th {
      text-align: left;
    }

    td {
      background-color: #626262;
      /* padding-left: 12px; */
      padding: 10px;
    }

    tbody>tr:nth-child(odd) {
      background-color: #f0f0f0;
    }

    /* Checkout Steps */

    .checkout-steps {
      display: flex;
      justify-content: space-between;
      width: 45rem;
      margin: 1rem auto;
    }

    .checkout-steps>div {
      border-top: .3rem #c0c0c0 solid;
      color: #c0c0c0;
      flex: 1 1;
      padding-top: 1rem;
    }

    .checkout-steps>div.active {
      border-top: .3rem white solid;
      color: white;
      /* border: 10px solid; */
      /* border-image-source: linear-gradient(45deg, rgb(0, 143, 104), rgb(250, 224, 66)); */
      /* border-image-slice: 1; */
      /* border-width: .3rem 0 0 0; */
    }

    /* Place Order */

    .placeorder {
      display: flex;
      flex-grow: wrap;
      padding: 1rem;
      justify-content: space-between;
      color: white;
      /* background-color: #737373; */
    }

    .placeorder-info {
      flex: 3 1 60rem;
    }

    .placeorder-action {
      flex: 1 1 20rem;
      border: .1rem #c0c0c0 solid;
      border-radius: .5rem;
      background-color: #fcfcfc;
      padding: 2rem;
      background-color: #5a5a5a;
      margin-bottom: 10px;
    }

    .placeorder-info>div {
      border: .1rem #c0c0c0 solid;
      border-radius: .5rem;
      background-color: #fcfcfc;
      padding: 2rem;
      margin: 1rem;
      background-color: #5a5a5a;
    }

    .placeorder-info>div:first-child {
      margin-top: 0;
    }

    .placeorder-action>ul {
      padding: 0;
      list-style-type: none;
    }

    .placeorder-action>ul>li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .placeorder-action>ul>li:last-child {
      font-size: 2rem;
      font-weight: bold;
      color: white;
    }

    .placeorder-actions-payment>div {
      width: 100%;
    }

    /* Profile */

    .profile {
      display: flex;
      flex-wrap: wrap;
    }

    .profile-info {
      flex: 1 1 30rem;
    }

    .profile-orders {
      flex: 3 1 60rem;
    }

    /* admin */

    .dropdown {
      display: inline-block;
      position: relative;
      /* margin: auto; */
    }

    .dropdown-content {
      position: absolute;
      display: none;
      right: 0;
      padding: 1rem;
      list-style-type: none;
      z-index: 1;
      background-color: #333333;
      margin: 0;
      border-radius: 5px;
      /* margin-top: 0.4rem; */
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .dropdown:hover .dropdown-content {
      display: flex;
      flex-direction: column;
    }

    .dropdown-nav {
      display: inline-block;
      position: relative;
    }

    .dropdown-nav-content {
      position: absolute;
      display: none;
      left: 0;
      padding: 1rem;
      list-style-type: none;
      z-index: 1;
      background-color: #333333;
      margin: 0;
      border-radius: 5px;
      /* margin-top: 0.4rem; */
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .dropdown-nav:hover .dropdown-nav-content {
      display: flex;
      flex-direction: column;
    }

    /* filter */

    /* .filter {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 1rem auto;
  max-width: 45rem;
  justify-content: center;
  align-items: center;
}

.filter input, .filter button, .filter select {
  padding: 1rem;
  border-radius: 0.5rem;
  border: .1rem #c0c0c0 solid;
  font-size: 1.6rem;
  margin-right: 5px;
} */

    .categories {
      padding: 0;
      list-style-type: none;
    }

    .categories a {
      display: flex;
      padding: 1rem;
    }

    .categories a:hover {
      background-color: #c0c0c0;
    }

    /* Slide Show */

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
    }

    /* The grid: Four equal columns that floats next to each other */

    .column {
      float: left;
      width: 25%;
      padding: 10px;
    }

    /* Style thehttp://www.glow-leds.com images inside the grid */

    .column img {
      opacity: 0.8;
      cursor: pointer;
      height: unset;
    }

    .column img:hover {
      opacity: 1;
    }

    /* Clear floats after the columns */

    .row:after {
      content: "";
      display: table;
      clear: both;
    }

    /* The expanding image container */

    .container {
      position: relative;
      display: none;
    }

    /* Expanding image text */

    #imgtext {
      position: absolute;
      bottom: 15px;
      left: 15px;
      color: white;
      font-size: 20px;
    }

    /* Closable button inside the expanded image */

    .closebtn {
      position: absolute;
      top: 10px;
      right: 15px;
      color: white;
      font-size: 35px;
      cursor: pointer;
    }

    .fade_in {
      /* margin-top: 25px;
  font-size: 21px;
  text-align: center; */
      -webkit-animation: 2s ease 0s normal forwards 1 fadein;
      animation: 2s ease 0s normal forwards 1 fadein;
      /* -webkit-animation: fadein 2s; */
      /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadein 2s;
      /* Firefox < 16 */
      -ms-animation: fadein 2s;
      /* Internet Explorer */
      -o-animation: fadein 2s;
      /* Opera < 12.1 */
      /* animation: fadein 2s; */
      /* -webkit-animation: bummer 2s;
  animation: bummer 2s;
  -webkit-transform: scale(0, 0);
  transform: scale(.8, .8);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards; */
    }

    /* @-webkit-keyframes bummer {
  100% {
    -webkit-transform: scale(1, );
  }
} */

    /* Firefox < 16 */

    @-moz-keyframes fadein {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    /* Safari, Chrome and Opera > 12.1 */

    @-webkit-keyframes fadein {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    /* Internet Explorer */

    @-ms-keyframes fadein {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    /* Opera < 12.1 */

    @-o-keyframes fadein {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes fadein {
      0% {
        opacity: 0;
      }

      20% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @-webkit-keyframes fadein {
      0% {
        opacity: 0;
      }

      20% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .zoom {
      -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .zoom::after {
      -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .zoom:hover {
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }

    .zoom:hover::after {
      opacity: 1;
    }

    .zoom:active {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }

    .zoom:active::after {
      opacity: 1;
    }

    @media only screen and (max-width: 1468px) {
      .home_links {
        justify-content: center !important;
      }

      .content {
        min-height: 69vh !important;
      }
    }

    @media only screen and (max-width: 1330px) {
      .ship_deliver {
        /* justify-content: space-between !important; */
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 1468px) and (min-width: 1032px) {
      .sidebar {
        display: none;
      }
    }

    @media only screen and (max-width: 1040px) {
      .product_title_top {
        display: flex !important;
        justify-content: center;
      }

      .product_title_side {
        display: none !important;
      }

      .details {
        justify-content: center;
      }

      .nav_bar {
        width: unset !important;
      }

      .brand {
        margin-right: 20px !important;
      }
    }

    @media only screen and (max-width: 1032px) {
      .home_links {
        justify-content: center !important;
      }

      .nav_buttons {
        font-size: 14px;
        display: none;
      }

      .mobile_buttons {
        /* display: block !important; */
      }

      .logo {
        /* display: none; */
      }

      .logo_2 {
        /* display: block !important; */
      }

      .nav_bar {
        display: none;
      }

      /* 
      .glow_leds_text {
        font-size: 50px !important;
      } */

      .content {
        /* margin-top: 120px !important; */
        min-height: 76vh !important;
      }

      .details-info {
        flex: unset;
      }

      .details-image {
        margin: 0;
        margin-bottom: 20px;
      }

      .cart-action-container {
        flex: 1 1 100rem !important;
      }

      .cart-action {
        flex: 1 1 100rem !important;
      }

      .cart {
        margin: 0rem;
      }

      .placeorder {
        flex-wrap: wrap;
      }

      .placeorder-action {
        margin: 10px;
        margin-top: 0px;
      }
    }

    @media only screen and (max-width: 704px) {
      .h1_title {
        font-size: 35px !important;
      }

      .h2_title {
        font-size: 25px !important;
      }

      .p_descriptions {
        font-size: 16px !important;
      }

      .content {
        margin: 0px !important;
        /* margin-top: 98px !important; */
        border-radius: 0px !important;
        width: 100% !important;
        min-height: 81vh !important;
      }

      .glow_leds_text {
        font-size: 40px !important;
      }

      .logo_2 {
        height: 70px !important;
      }

      .main_container,
      .profile_container,
      .table_container {
        padding: 0px !important;
      }

      .sidebar {
        top: 100px !important;
      }

      .profile_orders_container {
        margin: 0;
      }
    }

    @media only screen and (max-width: 528px) {
      .h1_title {
        font-size: 30px !important;
        margin-bottom: 10px !important;
      }

      .h2_title {
        font-size: 20px !important;
      }

      .h3_title {
        font-size: 25px !important;
      }

      .p_descriptions {
        font-size: 14px !important;
      }

      .mobile_nav_buttons {
        font-size: 14px !important;
      }

      .home_page_img,
      .product-image {
        max-width: 250px !important;
        max-height: 250px !important;
        margin: 0px;
      }

      .glow_leds_text {
        /* font-size: 35px !important; */
      }

      .content {
        /* margin-top: 80px !important; */
        min-height: 83vh !important;
      }

      .logo {
        height: 80px !important;
      }

      .sidebar {
        top: 92px !important;
      }

      .main_container {
        padding: 0px !important;
      }

      .search_container {
        max-width: 250px !important;
      }

      .cart_text {
        display: none !important;
      }

      .cart_icon {
        display: block !important;
      }

      .checkout-steps {
        width: 35rem;
      }

      .checkout-steps>div {
        font-size: 14px;
      }

      .label {
        font-size: 14px;
      }

      .placeorder-action>ul>li {
        font-size: 14px;
      }

      .cart-price {
        font-size: 18px;
      }

      .cart-list-container li img {
        max-width: 7rem;
      }

      .brand {
        margin-right: 0px !important;
      }

      .nav_bar {
        margin-left: 23px !important;
      }
    }

    @media only screen and (max-width: 412px) {
      .product_title_top {
        font-size: 3rem !important;
      }

      .back-to-result {
        padding: 0 !important;
      }

      .checkout-steps {
        width: 30rem;
      }

      .checkout-steps>div {
        font-size: 13px;
      }

      .placeorder-action,
      .cart-list-container,
      .placeorder-info>div {
        background-color: unset;
        border: 0;
        max-width: 32rem !important;
        margin: 0 auto;
        padding: 0;
      }

      .placeorder-info>div,
      .placeorder-action {
        margin: auto;
        margin-bottom: 20px;
      }
    }

    @media only screen and (max-width: 355px) {
      .glow_leds_text {
        /* display: none !important; */
      }

      .sidebar {
        top: 90px !important;
      }

      .product_title_top {
        font-size: 3rem !important;
      }

      .subtotal_h3 {
        font-size: 17px;
      }

      .checkout-steps {
        width: 25rem;
      }

      .checkout-steps>div {
        font-size: 12px;
      }

      .form-container,
      .placeorder-action,
      .cart-list-container,
      .placeorder-info>div {
        background-color: unset;
        border: 0;
        max-width: 32rem !important;
        margin: 0 auto;
        padding: 0;
      }

      .placeorder-info>div {
        margin-bottom: 20px;
      }

      .nav_bar {
        margin-left: 0px !important;
      }

      /* .logo_text {
    flex-direction: column !important;
  } */
    }
  </style>
</head>

<body data-gr-c-s-loaded="true" style="height: 100%; overflow-y: scroll;">
  <div id="root" style="height: 100%;">
    <div class="fade_in" style="height: 100%;">
      <header id="overlay"
        style="grid-area: header / header / header / header; background-color: rgb(51, 51, 51); color: rgb(255, 255, 255); display: flex; align-items: center; padding: 15px; list-style-type: none; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; flex-direction: column;">
        <div class="brand"><a href="/"><img class="zoom logo" height="125px"
              src="http://www.glow-leds.com/images/optimized_images/logo_images/glow_logo_optimized.png" alt="Glow LEDs"></a><button
            class="button_symbol mobile_buttons" style="display: none; font-size: 30px; height: 50px; width: 50px;"><i
              cl ass="fas fa-bars" aria-hidden="true"></i></button></div>
        <div style="display: flex; justify-content: center; margin: 0px auto; flex-direction: column;">
          <div class="logo_text" style="display: flex; justify-content: center; margin: 0px auto; align-items: center;">
            <a href="/"><img class="logo_2" src="http://www.glow-leds.com/images/optimized_images/logo_images/glow_logo_optimized.png" alt="Glow LEDs"
                style="display: none; height: 80px;"></a><a href="/">
              <h1 class="glow_leds_text"
                style="display: flex; font-family: Helvetica; font-size: 67px; margin: 17px 0px 10px; text-align: center; justify-content: center; width: 100%;">
                Glow LEDs</h1>
            </a></div>
        </div>
      </header>
      <div class="content"
      style="width: 75%; margin: 30px auto; grid-area: main / main / main / main; background: linear-gradient(rgb(138, 138, 138) 0%, rgb(39, 39, 39) 100%); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; border-radius: 20px; padding: 2rem; min-height: 81vh; ">
      <div>
        ${body}
        </div>
  </body>
  
  </html>
	`;
}