// React
import React from 'react';
import { Link } from 'react-router-dom';
import { humanize } from '../../utils/helper_functions';

import { LazyImage } from '../UtilityComponents';

const MenuItemM = ({ item, index, decide_url }) => {
	console.log({ item });
	return (
		<li key={index} className="w-100per">
			<Link to={item.link}>
				<div className="small_screen_product row">
					<LazyImage
						className="product-image w-200px h-200px "
						alt={item.category}
						title="Affiliate Image"
						effect="blur"
						size={{ height: 'auto', width: '100%' }}
						src={item.image}
					/>
					<div className="column jc-b  pl-2rem">
						<h2 className="w-100per ">{item.label}</h2>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default MenuItemM;
