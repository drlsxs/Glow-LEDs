import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { validate_password_change } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

const ChangePasswordPage = (props) => {
	const history = useHistory();
	const [ current_password, setCurrentPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const dispatch = useDispatch();

	const [ current_password_validations, setCurrentPasswordValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(update({ userId: userInfo._id, email, name, password }));
	// 	history.push('/profile');
	// };

	const submitHandler = async (e) => {
		e.preventDefault();
		const validation_data = { id: userInfo._id, current_password, password, rePassword };
		// console.log({ data });
		const request = await validate_password_change(validation_data);
		console.log({ request });
		setCurrentPasswordValidations(request.errors.current_password);
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);

		if (request.isValid) {
			dispatch(update({ userId: userInfo._id, password }));
			history.push('/profile');
		}
	};

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	useEffect(
		() => {
			if (userInfo) {
				setPassword(userInfo.password);
			}
			dispatch(listMyOrders());
			return () => {};
		},
		[ userInfo ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<FlexContainer class="profile_container" column styles={{ padding: '20px' }}>
			<FlexContainer>
				<Link to="/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
			</FlexContainer>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								{/* <h2>User Profile</h2> */}
								<Title styles={{ fontSize: 30, textAlign: 'center', width: '100%' }}>
									Change Password
								</Title>
							</li>
							<li>
								<FlexContainer h_center>
									{loading && (
										<FlexContainer h_center column>
											<Title styles={{ fontSize: 20 }}>Loading...</Title>
											<Title styles={{ fontSize: 20 }}>
												If pages doesn't show in 5 seconds, refresh the page.
											</Title>
										</FlexContainer>
									)}
									{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
									{success && <Title styles={{ fontSize: 20 }}>Profile Saved Successfully</Title>}
								</FlexContainer>
							</li>
							<li>
								<label htmlFor="current_password">Current Password</label>
								<input
									defaultValue={current_password}
									type="password"
									id="current_password"
									name="current_password"
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{current_password_validations}
							</label>
							<li>
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{password_validations}
							</label>
							<li>
								<label htmlFor="rePassword">Re-Enter Password</label>
								<input
									type="password"
									id="rePassword"
									name="rePassword"
									onChange={(e) => setRePassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{re_password_validations}
							</label>
							<li>
								<button type="submit" className="button primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/profile">
									<button type="button" className="button secondary full-width">
										Cancel
									</button>
								</Link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</FlexContainer>
	);
};

export default ChangePasswordPage;
