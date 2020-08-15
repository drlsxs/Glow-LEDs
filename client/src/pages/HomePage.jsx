import React from 'react';
import { FlexContainer } from '../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

const HomePage = (props) => {
	return (
		<div class="main_container">
			<MetaTags>
				<title>Glow LEDs | Home of the Diffuser Caps.</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1 className="welcome_text" style={{ fontSize: '6rem', marginBottom: '3vh' }}>
					Welcome to Glow-LEDs
				</h1>
			</FlexContainer>
			<FlexContainer h_center>
				<h1> INTRODUCING: Honey Comb Diffuser Caps </h1>
			</FlexContainer>

			<img
				style={{ borderRadius: '10px', width: '100%' }}
				src="/images/optimized_images/promo_images/img_0792_1_optimized.jpg"
				alt="promo"
			/>
			<FlexContainer h_center>
				<h1>24 Hour BOGO Sale</h1>
			</FlexContainer>
			<FlexContainer h_center>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					For 24hrs only GET A FREE SET OF HEART DIFFUSER CAPS WITH ANY PURCHASE OF DIFFUSER CAPS ❤😱 No code
					necessary! Simply write in the order notes that you'd like the free set of Heart Diffuser Caps and
					they're all yours 😁 Offer good until 5pm CST 8/15/2020 And please don't forget to order Diffuser
					Adapters, you will need a set to use these babies
				</p>
			</FlexContainer>
			<FlexContainer h_center v_i_center>
				{/* <img
					style={{ borderRadius: '10px', width: '43%' }}
					src="/images/optimized_images/product_images/Diffusers/Diffuser_Caps/Dodecahedron_Face/img_9979_optimized.jpg"
					alt="promo"
				/> */}
				{/* <h1 style={{ fontSize: '60px', margin: '18px' }}>+</h1> */}
				<img
					style={{
						borderRadius: '10px',
						// objectFit: 'cover',
						// objectPosition: '-20% -319px',

						width: '100%'
						// height: '375px'
					}}
					src="/images/optimized_images/promo_images/1_img_9836_optimized.png"
					alt="promo"
				/>
			</FlexContainer>
			<FlexContainer h_center />
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Buy any set of diffuser caps and get a free set of heart diffuser caps in your order!
			</p>
			<FlexContainer h_center>
				<h1>From a Glover that just wants the world to stay lit</h1>
			</FlexContainer>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</p>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>Diffuser Caps</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/CaC-86DAql4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					It's been too long since a truly new element has been introduced to gloving. We are here to change
					lightshows forever. This new technology puts designs on the outside of your glove for ultimate
					definition. Using a propriety design, you will be able to simply screw on the caps through the
					gloves to the adapter and start throwing heat right away. Mix and match the cap designs create truly
					ridiculous light shows. 100% facemelt guarantee.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/caps">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Diffuser Caps</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>Infinity Mirrors</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
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
					<h1>String Lights</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
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
					<Link to="/collections/all/products/category/string_lights">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop String Lights</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
		</div>
	);
};
export default HomePage;
