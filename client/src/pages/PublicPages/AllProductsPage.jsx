import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { Product, Search, Sort } from '../../components/SpecialtyComponents/index';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Loading } from '../../components/UtilityComponents';
import { humanize } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const AllProductsPage = (props) => {
	const history = useHistory();
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	// console.log({ category });
	// console.log(props.match.params);
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(listProducts(''));
		dispatch(listProducts(category));
	}, []);

	// for (let product of products) {
	// 	console.log(product);
	// }
	// useEffect(() => {
	// 	// dispatch(listProducts(''));
	// 	for (let product of products) {
	// 		console.log(product);
	// 	}
	// }, []);

	useEffect(
		() => {
			if (
				[
					'caps',
					'infinity_mirrors',
					'accessories',
					'frosted_diffusers',
					'diffuser_adapters',
					'string_lights'
				].includes(category)
			) {
				dispatch(listProducts(category));
			} else {
				history.push('/collections/all/products');
				dispatch(listProducts(''));
			}
		},
		[ category ]
	);

	useEffect(
		() => {
			dispatch(listProducts(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listProducts(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(category, searchKeyword, e.target.value));
	};

	const descriptions = {
		all_products:
			'Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Infinity Mirrors, and String Lights. Click to Shop.',
		frosted_diffusers:
			'Take your gloving light shows to the next level with our Frosted Dome Diffusers at Glow LEDs. Shop Dome Diffusers, Large Dome Diffusers, and Frosted Diffusers. Click to Shop.',
		caps:
			'Take your gloving light shows to the next level with our Diffuser Caps at Glow LEDs. Shop Screw on LED Caps, Cap over Diffusers, and Diffuser filters. Click to Shop.',
		diffuser_adapters:
			'Take your gloving light shows to the next level with our Diffuser Adapters at Glow LEDs. Shop Screw On Diffusers, LED Adapters, and Diffuser Cap Adapters. Click to Shop.',
		string_lights:
			'Decorate your home and festival with these stunning string lights at Glow LEDs. Shop String Lights, LED Strips, and Addressable LEDs. Click to Shop.',
		infinity_mirrors:
			'Decorate your home and festival with these stunning Infinity Mirrors at Glow LEDs. Shop Addressable LED Mirrors, LED Mirrors, and Custom Infinity Mirrors. Click to Shop.'
	};

	const description_determination = () => {
		if (category === 'frosted_diffusers') {
			return descriptions.frosted_diffusers;
		}
		if (category === 'diffuser_adapters') {
			return descriptions.diffuser_adapters;
		}
		if (category.toLowerCase() === 'caps') {
			return descriptions.caps;
		}
		if (category === 'infinity_mirrors') {
			return descriptions.infinity_mirrors;
		}
		if (category === 'string_lights') {
			return descriptions.string_lights;
		} else {
			return descriptions.all_products;
		}
	};

	return (
		<div>
			<MetaTags>
				<title>Products | Glow LEDs</title>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
				<meta name="description" content={description_determination()} />
				<meta property="og:description" content={description_determination()} />
				<meta name="twitter:description" content={description_determination()} />
			</MetaTags>
			<FlexContainer h_center>
				<h1>{humanize(category) || 'Products'}</h1>
			</FlexContainer>
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{products && (
					<ul className="products" style={{ marginTop: 0 }}>
						{products.map(
							(product, index) =>
								!product.hidden && <Product size="300px" key={index} product={product} />
						)}
					</ul>
				)}
				{products.length === 0 && (
					<h2 style={{ textAlign: 'center' }}>Sorry we can't find anything wiht that name</h2>
				)}
			</Loading>
		</div>
	);
};
export default AllProductsPage;
