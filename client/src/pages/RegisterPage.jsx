import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
// import { email_registration } from '../actions/emailActions';
import { FlexContainer } from '../components/ContainerComponents';

function RegisterPage(props) {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
	// useEffect(() => {
	//   console.log(userInfo)
	//   if (userInfo) {
	//     props.history.push(redirect);
	//   }
	// }, [userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password));
		// dispatch(email_registration(name, email, password));
		props.history.push(redirect);
	};
	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						{/* <h2>Create Account</h2> */}
						<FlexContainer>
							<Title styles={{ width: '100%', marginRight: '-40px' }}>Create</Title>{' '}
							<Title styles={{ width: '100%' }}>Account</Title>
						</FlexContainer>
					</li>
					<li>
						<FlexContainer h_center>
							{loading && (
								<FlexContainer h_center column>
									<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
									<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
										If pages doesn't show in 5 seconds, refresh the page.
									</Title>
								</FlexContainer>
							)}
							{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
						</FlexContainer>
					</li>
					<li>
						<label htmlFor="name">Name</label>
						<input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</li>
					<li>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="rePassword">Re-Enter Password</label>
						<input
							type="password"
							id="rePassword"
							name="rePassword"
							onChange={(e) => setRePassword(e.target.value)}
						/>
					</li>
					<li>
						<button type="submit" className="button primary">
							Register
						</button>
					</li>
					<li>
						Already have an account?
						<Link
							to={redirect === '/' ? 'login' : 'login?redirect=' + redirect}
							className="button secondary text-center"
						>
							Sign In Here
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
}
export default RegisterPage;