import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { Title, Slideshow, ButtonSymbol, Label, ButtonWord } from '../components/UtilityComponents';

function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));

  }, []);


  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }
  function myFunction(e) {
    console.log(e.target.src)
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = e.target.src;
    // expandImg.setAttribute("src", [imgs.src])
    expandImg.parentElement.style.display = "block";
  }

  return <div>
    <div className="back-to-result">
      <Link to="/allproducts"><ButtonWord styles={{ fontSize: 20, fontFamily: "logo_font" }} >Back to Results</ButtonWord></Link>
    </div>
    {loading ? <Title styles={{ fontSize: 20, fontFamily: "logo_font" }} >Loading...</Title> :
      error ? <div>{error} </div> :
        (
          <div className="details">
            <div className="details-image">
              <img id="expandedImg" alt="" src={product.image_1} style={{ width: "400px", height: "400px" }} />
            </div>
            <div className="details-info">
              <Title styles={{ fontSize: 30, fontFamily: "logo_font", marginTop: 0 }} >{product.name}</Title>
              <Label styles={{ fontSize: 20, fontFamily: "logo_font" }} >Price:</Label>
              <Label>${product.price ? product.price.toFixed(2) : product.price}</Label>
              <Label styles={{ fontSize: 20, fontFamily: "logo_font" }} > Description:</Label>
              <div>
                {product.description}
              </div>
              <div className="details-image">
                {
                  [product.image_1, product.image_2, product.image_3, product.image_4].map((image, index) => {
                    return (
                      <div className="column" key={index}>
                        <img src={image} alt="" style={{ width: "100%" }} onClick={(e) => myFunction(e)} />
                      </div>
                    )
                  }
                  )
                }
              </div>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price: {product.price}
                </li>
                <li>
                  Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Qty: <select defaultValue={qty} onChange={(e) => { setQty(e.target.value) }}>
                    {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} defaultValue={x + 1}>{x + 1}</option>
                    )}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        )
    }


  </div>
}
export default ProductPage;