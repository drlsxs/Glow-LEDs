import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { listFeatures } from '../../actions/featureActions';
import { humanize } from '../../utils/helper_functions';

const MusicPage = (props) => {
	const featureList = useSelector((state) => state.featureList);
	const { loading, features, error } = featureList;

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading: loading_products, error: error_products } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listFeatures());
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div class="main_container">
			<MetaTags>
				<title>Featured | Glow LEDs</title>
				<meta property="og:title" content="Featured | Glow LEDs" />
				<meta name="twitter:title" content="Featured | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
				<meta
					name="description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					property="og:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					name="twitter:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1>Music Produced by NTRE</h1>
			</FlexContainer>

			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here at Glow LEDs I produce all of the videos, music, and pictures, here is all of the music that I
				produced which you'll hear in some of the promo videos!
			</p>

			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/890581492&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/liquid-funk"
					title="Liquid Funk"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					Liquid Funk
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/619573842&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/ntre-i-r-o-h-s-w-i-s-e-w-o-r-d-s"
					title="NTRE - I R O H S W I S E W O R D S"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - I R O H S W I S E W O R D S
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/443564769&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/ntre-x-azmeryth-rosey"
					title="NTRE X Azmeryth - Rosey"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE X Azmeryth - Rosey
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/357830813&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/youvegotmail"
					title="NTRE - (You&#x27;ve Got) Mail (FREE DOWNLOAD)"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - (You&#x27;ve Got) Mail (FREE DOWNLOAD)
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/355231952&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/fairies"
					title="NTRE - fairies (FREE DOWNLOAD)"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - fairies (FREE DOWNLOAD)
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/348099712&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/wumbo"
					title="NTRE - Wumbo (FREE DOWNLOAD)"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - Wumbo (FREE DOWNLOAD)
				</a>
			</div>

			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/331259766&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/smooth"
					title="NTRE - Smooth (FREE DOWNLOAD)"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - Smooth (FREE DOWNLOAD)
				</a>
			</div>
			<iframe
				width="100%"
				height="166"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/327562544&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
			/>
			<div
				style={{
					fontSize: '10px',
					color: '#cccccc',
					lineBreak: 'anywhere',
					wordBreak: 'normal',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontFamily:
						'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
					fontWeight: '100'
				}}
			>
				<a
					href="https://soundcloud.com/ntre"
					title="NTRE"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE
				</a>{' '}
				·{' '}
				<a
					href="https://soundcloud.com/ntre/mmm"
					title="NTRE - Mmm... (FREE DOWNLOAD)"
					target="_blank"
					style={{ color: '#cccccc', textDecoration: 'none' }}
				>
					NTRE - Mmm... (FREE DOWNLOAD)
				</a>
			</div>
		</div>
	);
};
export default MusicPage;
