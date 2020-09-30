import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSponsor, detailsSponsor, listSponsors } from '../../actions/sponsorActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditSponsorPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ glover_name, set_glover_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ funds_generated, set_funds_generated ] = useState('');
	const [ active, set_active ] = useState('');
	const [ loading_data, set_loading_data ] = useState(true);

	const history = useHistory();

	const sponsorDetails = useSelector((state) => state.sponsorDetails);
	const { sponsor, loading, error } = sponsorDetails;

	const sponsorSave = useSelector((state) => state.sponsorSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = sponsorSave;

	const sponsorDelete = useSelector((state) => state.sponsorDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = sponsorDelete;

	// const sponsorReviewDelete = useSelector((state) => state.sponsorReviewDelete);
	// const { success: sponsorDeleteSuccess } = sponsorReviewDelete;
	const sponsorList = useSelector((state) => state.sponsorList);
	const { sponsors } = sponsorList;

	const dispatch = useDispatch();
	const sponsor_id = props.match.params.id ? props.match.params.id : '';

	console.log({ sponsor });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsSponsor(props.match.params.id));
			dispatch(detailsSponsor(props.match.params.id));
		} else {
			dispatch(detailsSponsor(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (sponsor) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ sponsor ]
	);

	const set_state = () => {
		set_id(sponsor._id);
		set_user(sponsor.user);
		set_glover_name(sponsor.glover_name);
		set_instagram_handle(sponsor.instagram_handle);
		set_facebook_name(sponsor.facebook_name);
		set_percentage_off(sponsor.percentage_off);
		set_promo_code(sponsor.promo_code);
		set_funds_generated(sponsor.funds_generated);
		set_active(sponsor.active);

		// fsponsor.release_date);
		// console.log(format_date(sponsor.release_date));
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_glover_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_percentage_off('');
		set_promo_code('');
		set_funds_generated('');
		set_active('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(release_date);
		// console.log(format_date(release_date));
		// console.log(unformat_date(format_date(release_date)));
		// console.log(unformat_date(release_date));
		// console.log(format_date(unformat_date(release_date)));
		// console.log(format_date(unformat_date(release_date)));

		console.log({ id });
		dispatch(
			saveSponsor({
				_id: id,
				user,
				glover_name,
				instagram_handle,
				facebook_name,
				percentage_off,
				promo_code,
				funds_generated,
				active
			})
		);
		e.target.reset();
		set_id('');
		set_user('');
		set_glover_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_percentage_off('');
		set_promo_code('');
		set_funds_generated('');
		set_active('');
		// if (id) {
		// 	history.push('/collections/all/sponsors/' + id);
		// } else {
		history.push('/secure/glow/sponsors');
		// }
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Sponsor' : 'Create Sponsor'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{sponsor && (
							<div>
								<MetaTags>
									<title>Edit {sponsor.name} | Glow LEDs</title>
								</MetaTags>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Sponsor' : sponsor.name}
									</h1>

									<FlexContainer row wrap>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													name="user"
													value={user}
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="glover_name">Glover Name</label>
												<input
													type="text"
													name="glover_name"
													value={glover_name}
													id="glover_name"
													onChange={(e) => set_glover_name(e.target.value)}
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
											<li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li>
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
										</FlexContainer>
									</FlexContainer>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/sponsors">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Sponsor
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/sponsors">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Sponsors
												</button>
											</Link>
										)}
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
export default EditSponsorPage;