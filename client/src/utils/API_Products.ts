import axios from 'axios';

const product_routes = {
	get_category_images: (category: any) => {
		// console.log({ category });
		return axios.get('/api/products/get_images/' + category);
	},
	get_products_by_category: (category: string) => {
		// console.log({ get_products_by_category: category });
		return axios.get('/api/products/get_products_by_category/?category=' + category);
	},
	get_all_categories: () => {
		return axios.get('/api/products/get_all_categories');
	},
	get_all_subcategories: () => {
		return axios.get('/api/products/get_all_subcategories');
	},
	get_all_options: () => {
		return axios.get('/api/products/get_all_options');
	},
	get_all_diffuser_caps: () => {
		return axios.get('/api/products/get_all_diffuser_caps');
	},
	get_product_options: (pathname: any) => {
		return axios.get('/api/products/get_options/' + pathname);
	},
	get_product: (pathname: any) => {
		return axios.get('/api/products/' + pathname);
	},
	get_all_products: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_all_products');
	},
	get_chip_by_name: (name: string) => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/chips/' + name);
	},
	// get_product_names: (array: any) => {
	// 	console.log({ not_paid_email: array });
	// 	return axios.post('/api/products/array', array);
	// },
	// save_product: (order: any, user_data: any, product: any) => {
	// 	console.log({ save_product: { order, user_data, product } });
	// 	return axios.put('/api/orders/addproduct', { order, user_data, product });
	// },
	update_product_order: (product: any, order: any) => {
		// console.log({ update_product_order: { product, order } });
		return axios.put('/api/products/update_product_order', { product, order });
	},
	update_stock: (cartItems: any) => {
		// console.log({ update_stock: { product_id, new_count_in_stock } });
		return axios.put('/api/products/update_stock', { cartItems });
	},
	create_product_option: (product: any) => {
		// console.log({ update_stock: product });
		return axios.post('/api/products/create_product_option', product);
	},
	update_pathname: (product_id: string, pathname: string, product: any) => {
		// console.log({ update_pathname: { product_id, pathname } });
		return axios.put('/api/products/update_pathname', { product_id, pathname, product });
	},
	update_product_option_stock: (product_id: string, product_option: any, quantity_state: number) => {
		// console.log({ update_product_option_stock: { product_id, product_option, quantity_state } });
		return axios.put('/api/products/update_product_option_stock', { product_id, product_option, quantity_state });
	},
	// save_secondary_product: (order: any, user_data: any, secondary_product: any) => {
	// 	console.log({ save_secondary_product: { order, user_data, secondary_product } });
	// 	return axios.put('/api/orders/addsecondaryproduct', { order, user_data, secondary_product });
	// },
	get_original_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_caps');
	},
	get_mega_diffuser_caps: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_mega_caps');
	},
	get_occurrences: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/orders/occurrences');
	},
	get_category_occurrences: () => {
		console.log({ get_category_occurrences: 'Hello' });
		return axios.get('/api/orders/category_occurrences');
	},

	get_best_sellers: (occurences: any) => {
		// console.log({ not_paid_email: array });
		return axios.post('/api/products/best_sellers', { occurences });
	},
	save_item_group_id: (option: any, item_group: any) => {
		// console.log({ option, item_group });
		return axios.put('/api/products/save_item_group_id', { option, item_group });
	},
	get_essentials: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/essentials');
	},
	get_imperfect: () => {
		console.log('get_imperfect');
		return axios.get('/api/products/imperfect');
	},
	get_shown_products: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/products/get_shown');
	},
	get_display_content: () => {
		// console.log({ not_paid_email: array });
		return axios.get('/api/contents/display');
	},

	// get_product_pictures: (category: string) => {
	// 	return axios.get('/api/products/category/' + category);
	// },
	get_product_pictures: (category = '', subcategory = '') => {
		return axios.get('/api/products/?category=' + category + '&subcategory=' + subcategory);
	},
	// get_product_pictures: (category: string = '', subcategory: string = '') => {
	// 	return axios.get('/api/products/get_categories/' + category + '/' + subcategory);
	// },

	batch_request: (
		method: string,
		collection: string,
		search_parameter_field: string,
		search_parameter: string,
		action: string,
		property: string,
		value: string,
		user: any
	) => {
		return axios.put(
			'/api/all/' + collection,
			{
				method,
				collection,
				search_parameter_field,
				search_parameter,
				action,
				property,
				value
			},
			{
				headers: {
					Authorization: 'Bearer ' + user.access_token
				}
			}
		);
	},
	set_sale_price: (discount_percentage: any, sale_start_date: any, sale_end_date: any) => {
		console.log({ discount_percentage, sale_start_date, sale_end_date });
		return axios.put('/api/all/product_sale_price', { discount_percentage, sale_start_date, sale_end_date });
	},
	clear_sale: (sale_start_date: any, sale_end_date: any) => {
		return axios.put('/api/all/clear_sale', { sale_start_date, sale_end_date });
	}
};

export default product_routes;
