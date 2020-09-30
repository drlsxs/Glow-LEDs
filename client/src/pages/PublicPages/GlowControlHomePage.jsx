import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';

import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { detailsContent, listContents } from '../../actions/contentActions';
import { deleteDevice, listMyDevices } from '../../actions/deviceActions';
import { Loading } from '../../components/UtilityComponents';

const GlowControlHomePage = (props) => {
	const user_data = props.userInfo;
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content, loading, error } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { loading: loading_contents, contents, error: error_contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_content = contents.find((content) => content.active === true);
			if (active_content) {
				dispatch(detailsContent(active_content._id));
			}
			return () => {};
		},
		[ contents ]
	);

	const myDeviceList = useSelector((state) => state.myDeviceList);
	const { loading: loading_devices, devices, error: error_devices } = myDeviceList;

	console.log({ devices });

	const deviceSave = useSelector((state) => state.deviceSave);
	const { success: successSave } = deviceSave;

	const deviceDelete = useSelector((state) => state.deviceDelete);
	const { success: successDelete } = deviceDelete;

	useEffect(
		() => {
			dispatch(listMyDevices());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(listMyDevices(category, searchKeyword, sortOrder));
	// };

	// const sortHandler = (e) => {
	// 	setSortOrder(e.target.value);
	// 	dispatch(listMyDevices(category, searchKeyword, e.target.value));
	// };

	// useEffect(
	// 	() => {
	// 		dispatch(listMyDevices(category, searchKeyword, sortOrder));
	// 	},
	// 	[ sortOrder ]
	// );

	const deleteHandler = (device) => {
		dispatch(deleteDevice(device._id));
	};

	return (
		<div class="main_container">
			<MetaTags>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and Glow Strings."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and Glow Strings."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and Glow Strings."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>

				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>

			<FlexContainer h_center>
				<h1 className="welcome_text mb-3rem" style={{ fontSize: '6rem' }}>
					Welcome to Glow Control
				</h1>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>From a Glover that just wants the world to stay lit</h1>
			</FlexContainer>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Control your Glow LEDs Infinity Mirrors and Glow Strings with ease!
			</p>

			<div className="home_page_divs">
				<div className="wrap jc-b">
					<h1 className=" w-500px" />
					<h1 className="ta-c">Devices</h1>
					<div className=" jc-fe w-500px">
						<label className="p-10px ">Click Here to Get Started!</label>
						<Link to="/secure/account/editdevice">
							<button className="button primary">Add Device</button>
						</Link>
					</div>
				</div>
				{user_data ? devices && devices.length > 0 ? (
					<Loading loading={loading_devices} error={error_devices}>
						{devices && (
							<div className="device-list responsive_table">
								<table className="table">
									<thead>
										<tr>
											<th>Name</th>
											<th>URL</th>
											<th>Location</th>
											<th>View</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{devices.map((device) => (
											<tr
												key={device._id}
												style={{
													backgroundColor: '#3e4c6d',
													fontSize: '1.4rem'
												}}
											>
												<td>{device.device_name}</td>
												<td>{device.query_url}</td>
												<td>{device.location}</td>
												<td>
													<Link to={'/secure/account/glowcontrol/' + device._id}>
														<button className="button icon">
															<i class="fas fa-eye" />
														</button>
													</Link>
												</td>
												<td>
													<FlexContainer h_between>
														<Link to={'/secure/account/editdevice/' + device._id}>
															<button className="button icon">
																<i className="fas fa-edit" />
															</button>
														</Link>
														<button
															className="button icon"
															onClick={() => deleteHandler(device)}
														>
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
				) : (
					<h2 className="p-10px ta-c">No Devices Yet</h2>
				) : (
					<div className="row jc-c ai-c">
						<h2 className="p-10px ta-c">Login to View Devices</h2>
						<Link to="/account/login?redirect=/pages/glowcontrol">
							<button className="button primary">Login</button>
						</Link>
					</div>
				)}
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1 style={{ textAlign: 'center' }}>Infinity Mirrors</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							title="Infinity Mirrors Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/K8hSD_VaYG4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity mirrors
					are the perfect addition to any chill space. Look into another dimension as vibrant LEDs go on for
					miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that will only be
					found in your space.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/infinity_mirrors">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Infinity Mirrors</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>Glow Strings</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							title="Glow Strings Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/TCArM88Ll1s?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your home
					into a festival. Strobes, fades, flashes, they have it all. fill your universe with a swimming pool
					of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100 LED), 34 ft (150
					LED), and 46 ft (200 LED) options so there’s a size for every need.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/glow_strings">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Glow Strings</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
		</div>
	);
};
export default GlowControlHomePage;