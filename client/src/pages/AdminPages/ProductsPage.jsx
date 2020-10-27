import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const ProductsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listProducts());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (product) => {
		console.log(product._id);
		dispatch(deleteProduct(product._id));
	};

	useEffect(
		() => {
			dispatch(listProducts(category.subcategory, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listProducts(category, subcategory, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(category, subcategory, searchKeyword, e.target.value));
	};
	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest', 'Hidden' ];

	const sale_price_switch = (product) => {
		if (product.sale_price !== 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" /> ${product.sale_price ? (
						product.sale_price.toFixed(2)
					) : (
						product.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (!product.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginRight: '7px' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label style={{ marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
		}
	};
	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Products | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
					<label style={{ marginRight: '1rem' }}>Hidden</label>
					<div style={{ backgroundColor: '#333333', height: '20px', width: '60px', borderRadius: '5px' }} />
				</FlexContainer>
				<Link to="/secure/glow/display_products">
					<button className="button primary">Display Products</button>
				</Link>
				<Link to="/secure/glow/editproduct">
					<button className="button primary" style={{ width: '160px' }}>
						Create Product
					</button>
				</Link>
			</FlexContainer>
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Products</h1>
				{/* <Link to="/editproduct">
					<button className="button primary" style={{ width: '160px' }}>
						Create Product
					</button>
				</Link> */}
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{products && (
					<div className="product-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Hidden</th>
									<th>Name</th>
									<th>Price</th>
									<th>Category</th>
									<th>Order</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr
										key={product._id}
										style={{ backgroundColor: product.hidden ? colors.hidden : '#626262' }}
									>
										<td>
											<Link to={'/collections/all/products/' + product.pathname}>
												{product._id}
											</Link>
										</td>
										<td>
											{product.hidden ? (
												<i className="fas fa-eye-slash" />
											) : (
												<i className="fas fa-eye" />
											)}
										</td>
										<td style={{ minWidth: '420px' }}>{product.name}</td>
										<td style={{ minWidth: '225px' }}>{sale_price_switch(product)}</td>
										<td>{product.category}</td>
										<td style={{ minWidth: '111px' }}>{product.order}</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editproduct/' + product.pathname}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(product)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default ProductsPage;
