import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveTeam, detailsTeam } from '../../actions/teamActions';
import { useHistory } from 'react-router-dom';
import { ImageDisplay, Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listAffiliates } from '../../actions/affiliateActions';
import { snake_case } from '../../utils/helper_functions';
import { listPromos } from '../../actions/promoActions';

const EditTeamPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ affiliate, set_affiliate ] = useState('');
	const [ affiliates, set_affiliates ] = useState([]);
	const [ team_name, set_team_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ promoter, set_promoter ] = useState('');
	const [ rave_mob, set_rave_mob ] = useState('');
	const [ active, set_active ] = useState('');
	const [ bio, set_bio ] = useState('');
	const [ map, set_map ] = useState('');
	const [ link, set_link ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');
	const [ picture, set_picture ] = useState('');
	const [ video, set_video ] = useState('');
	const [ public_code, set_public_code ] = useState('');
	const [ private_code, set_private_code ] = useState('');
	const [ venmo, set_venmo ] = useState('');

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates: affiliates_list } = affiliateList;

	const history = useHistory();

	const teamDetails = useSelector((state) => state.teamDetails);
	const { team, loading, error } = teamDetails;

	const promoList = useSelector((state) => state.promoList);
	const { promos: promos_list } = promoList;

	const set_state = () => {
		set_id(team._id);
		set_team_name(team.team_name);
		set_instagram_handle(team.instagram_handle);
		set_facebook_name(team.facebook_name);
		set_percentage_off(team.percentage_off);
		set_promo_code(team.promo_code);
		set_promoter(team.promoter);
		set_rave_mob(team.rave_mob);
		set_sponsor(team.sponsor);
		set_map(team.map);
		set_images(team.images);
		set_active(team.active);
		set_bio(team.bio);
		set_link(team.link);
		set_pathname(team.pathname);
		set_picture(team.picture);
		set_affiliates(team.affiliates);
		set_video(team.video);
		set_public_code(team.public_code);
		set_private_code(team.private_code);
		set_venmo(team.venmo);
	};
	const unset_state = () => {
		set_id('');
		set_team_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_percentage_off('');
		set_promo_code('');
		set_promoter('');
		set_rave_mob('');
		set_sponsor('');
		set_images('');
		set_active('');
		set_bio('');
		set_link('');
		set_pathname('');
		set_video('');
		set_picture('');
		set_affiliates([]);
		set_public_code('');
		set_private_code('');
		set_venmo('');
	};

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (props.match.params.pathname) {
					console.log('Is ID');
					dispatch(detailsTeam(props.match.params.pathname));
					dispatch(detailsTeam(props.match.params.pathname));
					set_state();
				} else {
					dispatch(detailsTeam(''));
				}
				dispatch(listAffiliates({}));
				dispatch(listPromos({}));
			}
			return () => (clean = false);
		},
		[ dispatch, props.match.params.pathname ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (team) {
					console.log('Set');
					set_state();
				} else {
					console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
		},
		[ team ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		console.log({ public_code });
		console.log({ private_code });
		e.preventDefault();
		dispatch(
			saveTeam({
				_id: id,
				team_name,
				instagram_handle,
				facebook_name,
				percentage_off,
				images,
				sponsor,
				map,
				promoter,
				rave_mob,
				active,
				bio,
				link,
				video,
				picture,
				venmo,
				public_code: public_code && public_code._id,
				private_code: private_code && private_code._id,
				pathname: pathname ? pathname : snake_case(team_name),
				affiliates: affiliates && affiliates.map((affiliate) => affiliate._id)
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/teams');
	};

	const add_affiliate = (e) => {
		e.preventDefault();
		const affiliate_object = JSON.parse(e.target.value);
		// console.log(affiliate);
		// if (affiliate.indexOf(' ') >= 0) {
		// 	console.log('indexOf');
		// 	affiliate.split(' ').map((affiliate) => {
		// 		set_affiliates((affiliates) => [ ...affiliates, affiliate ]);
		// 	});
		// } else
		if (affiliates) {
			console.log('affiliates.length > 0');
			set_affiliates((affiliates) => [ ...affiliates, affiliate_object ]);
		} else {
			console.log('affiliates.length === 0');
			set_affiliates([ affiliate_object ]);
		}

		set_affiliate('');
	};

	const remove_affiliate = (affiliate_index, e) => {
		e.preventDefault();
		set_affiliates((affiliates) =>
			affiliates.filter((affiliate, index) => {
				return affiliate_index !== index;
			})
		);
	};

	const affiliate_display = (affiliates) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{affiliates &&
							affiliates.map((affiliate, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
										<div>
											<button className="btn icon" onClick={(e) => remove_affiliate(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{affiliate.artist_name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	const add_promo = (e, code_type) => {
		e.preventDefault();
		const promo_object = JSON.parse(e.target.value);
		console.log({ promo_object });
		// console.log(promo);
		// if (promo.indexOf(' ') >= 0) {
		// 	console.log('indexOf');
		// 	promo.split(' ').map((promo) => {
		// 		set_promos((promos) => [ ...promos, promo ]);
		// 	});
		// } else
		if (code_type === 'public') {
			console.log('public');
			set_public_code(promo_object);
		} else if (code_type === 'private') {
			console.log('private');
			set_private_code(promo_object);
		}
	};

	const remove_promo = (e, code_type) => {
		e.preventDefault();
		if (code_type === 'public') {
			console.log('public');
			set_public_code({});
		} else if (code_type === 'private') {
			console.log('private');
			set_private_code({});
		}
	};
	const promo_display = (promo, code_type) => {
		console.log({ promo });
		if (promo) {
			return (
				<div>
					<div className="jc-b">
						<div>
							<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
								<div>
									<button className="btn icon" onClick={(e) => remove_promo(e, code_type)}>
										<i className="fas fa-times mr-5px" />
									</button>
									{promo && promo.promo_code}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Team' : 'Create Team'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{console.log({ team })}
					<Loading loading={loading} error={error}>
						{team && (
							<div>
								<Helmet>
									<title>Edit Team | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="w-228px m-10px">
											<li>
												<label htmlFor="affiliate">Affiliate</label>
												{/* <input
													type="text"
													name="affiliate"
													value={affiliate}
													id="affiliate"
													onChange={(e) => set_affiliate(e.target.value)}
												/> */}
												<div className="ai-c h-25px mv-15px jc-c">
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => add_affiliate(e)}
														>
															<option key={1} defaultValue="">
																---Choose Affiliate---
															</option>
															{affiliates_list.map((affiliate, index) => (
																<option key={index} value={JSON.stringify(affiliate)}>
																	{affiliate.artist_name || affiliate.glover_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
												<button className="btn primary" onClick={(e) => add_affiliate(e)}>
													Add Affiliate
												</button>
												{affiliate_display(affiliates)}
											</li>

											<li>
												<label htmlFor="team_name">Team Name</label>
												<input
													type="text"
													name="team_name"
													value={team_name}
													id="team_name"
													onChange={(e) => set_team_name(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="instagram_handle">Instagram Handle</label>
												<input
													type="text"
													name="instagram_handle"
													value={instagram_handle}
													id="instagram_handle"
													onChange={(e) => set_instagram_handle(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="facebook_name">Facebook Name</label>
												<input
													type="text"
													name="facebook_name"
													value={facebook_name}
													id="facebook_name"
													onChange={(e) => set_facebook_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="picture">Picture</label>
												<input
													type="text"
													name="picture"
													value={picture}
													id="picture"
													onChange={(e) => set_picture(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="map">Map</label>
												<input
													type="text"
													name="map"
													value={map}
													id="map"
													onChange={(e) => set_map(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="video">Video</label>
												<input
													type="text"
													name="video"
													value={video}
													id="video"
													onChange={(e) => set_video(e.target.value)}
												/>
											</li>
											{/* <li>
											<label htmlFor="style">Your Style</label>
											<input
												type="text"
												name="style"
												value={style}
												placeholder="Wave Tuts, Clusters, Whips..."
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder('Wave Tuts, Clusters, Whips...')}
												id="style"
												onChange={(e) => set_style(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="inspiration">Inspiration</label>
											<input
												type="text"
												name="inspiration"
												value={inspiration}
												placeholder="Flow, Megasloth, Jest..."
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder(''Flow, Megasloth, Jest...)}
												id="inspiration"
												onChange={(e) => set_inspiration(e.target.value)}
											/>
										</li> */}
											<li>
												<label htmlFor="bio">Bio</label>
												<textarea
													className="edit_product_textarea"
													name="bio"
													placeholder="Write a little something to introduce yourself..."
													// onFocus={() => this.placeholder('')}
													// onBlur={() =>
													// 	this.placeholder(
													// 		'Write a little something to introduce yourself...'
													// 	)}
													defaultValue={bio}
													id="bio"
													onChange={(e) => set_bio(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="link">Website</label>
												<input
													type="text"
													name="link"
													value={link}
													placeholder="https://www..."
													onFocus={() => this.placeholder('')}
													onBlur={() => this.placeholder('https://www...')}
													id="link"
													onChange={(e) => set_link(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="pathname">Pathname</label>
												<input
													type="text"
													name="pathname"
													defaultValue={
														pathname ? pathname : team_name && snake_case(team_name)
													}
													id="pathname"
													onChange={(e) => set_pathname(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="venmo">Venmo</label>
												<input
													type="text"
													name="venmo"
													value={venmo}
													id="venmo"
													onChange={(e) => set_venmo(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="percentage_off">Percentage Off</label>
												<input
													type="text"
													name="percentage_off"
													value={percentage_off}
													id="percentage_off"
													onChange={(e) => set_percentage_off(e.target.value)}
												/>
											</li>

											{/* <li>
												<label htmlFor="funds_generated">Funds Generated</label>
												<input
													type="text"
													name="funds_generated"
													value={funds_generated}
													id="funds_generated"
													onChange={(e) => set_funds_generated(e.target.value)}
												/>
											</li> */}
											{/* <li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li> */}
											<ImageDisplay
												images={images}
												set_images={set_images}
												image={image}
												set_image={set_image}
												name={'Images'}
											/>
											<li>
												<label htmlFor="promo">Public Code</label>
												<div className="ai-c h-25px mv-15px jc-c">
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => add_promo(e, 'public')}
														>
															<option key={1} defaultValue="">
																---Choose Public Code---
															</option>
															{promos_list
																.filter((promo) => !promo.hidden)
																.map((promo, index) => (
																	<option key={index} value={JSON.stringify(promo)}>
																		{promo.promo_code}
																	</option>
																))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>

												{promo_display(public_code, 'public')}
											</li>
											{/* <li>
												<label htmlFor="public_code">Public Code</label>
												<input
													type="text"
													name="public_code"
													value={public_code && public_code.promo_code}
													id="public_code"
													onChange={(e) => set_public_code(e.target.value)}
												/>
											</li> */}
											<li>
												<label htmlFor="promo">Private Code</label>
												<div className="ai-c h-25px mv-15px jc-c">
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => add_promo(e, 'private')}
														>
															<option key={1} defaultValue="">
																---Choose Private Code---
															</option>
															{promos_list
																.filter((promo) => !promo.hidden)
																.map((promo, index) => (
																	<option key={index} value={JSON.stringify(promo)}>
																		{promo.promo_code}
																	</option>
																))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
												{promo_display(private_code, 'private')}
											</li>
											{/* <li>
												<label htmlFor="private_code">Private Code</label>
												<input
													type="text"
													name="private_code"
													value={private_code && private_code.promo_code}
													id="private_code"
													onChange={(e) => set_private_code(e.target.value)}
												/>
											</li> */}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="sponsor">Sponsor</label>
													<input
														type="checkbox"
														name="sponsor"
														// defaultChecked={sponsor ? 'checked' : 'unchecked'}
														// defaultValue={sponsor}
														defaultChecked={sponsor}
														// value={sponsor ? '1' : '0'}
														id="sponsor"
														onChange={(e) => {
															set_sponsor(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="rave_mob">Rave Mob</label>
													<input
														type="checkbox"
														name="rave_mob"
														// defaultChecked={rave_mob ? 'checked' : 'unchecked'}
														// defaultValue={rave_mob}
														defaultChecked={rave_mob}
														// value={rave_mob ? '1' : '0'}
														id="rave_mob"
														onChange={(e) => {
															set_rave_mob(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="promoter">Promoter</label>
													<input
														type="checkbox"
														name="promoter"
														// defaultChecked={promoter ? 'checked' : 'unchecked'}
														// defaultValue={promoter}
														defaultChecked={promoter}
														// value={promoter ? '1' : '0'}
														id="promoter"
														onChange={(e) => {
															set_promoter(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="active">Active</label>
													<input
														type="checkbox"
														name="active"
														// defaultChecked={active ? 'checked' : 'unchecked'}
														// defaultValue={active}
														defaultChecked={active}
														// value={active ? '1' : '0'}
														id="active"
														onChange={(e) => {
															set_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Teams
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditTeamPage;
