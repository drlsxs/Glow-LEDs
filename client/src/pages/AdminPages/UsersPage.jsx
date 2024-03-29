import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format_date } from '../../utils/helper_functions';
import { Loading } from '../../components/UtilityComponents';
import { listUsers, deleteUser } from '../../actions/userActions';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';

const UsersPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listUsers({}));
			}
			return () => (clean = false);
		},
		[ successDelete ]
	);

	const deleteHandler = (user) => {
		dispatch(deleteUser(user._id));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listUsers({ category, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listUsers({ category, search, sort: e.target.value }));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listUsers({ category, search, sort }));
			}
			return () => (clean = false);
		},
		[ sort ]
	);

	const colors = [
		{ name: 'Not Verified', color: '#333333' },
		{ name: 'Verified', color: '#3e4c6d' },
		{ name: 'Admin', color: '#525252' },
		{ name: 'Affiliated', color: '#7d5555' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isVerified) {
			result = colors[0].color;
		}
		if (order.isVerified) {
			result = colors[1].color;
		}
		if (order.isAdmin) {
			result = colors[2].color;
		}
		if (order.is_affiliated) {
			result = colors[3].color;
		}
		// console.log(result);
		return result;
	};

	const sort_options = [ 'Date', 'First Name', 'Last Name' ];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Users | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				{colors.map((color, index) => {
					return (
						<div className="wrap jc-b w-20rem m-1rem" key={index}>
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</div>
					);
				})}
				<Link to="/secure/glow/edituser">
					<button className="btn primary" style={{ width: '160px' }}>
						Create User
					</button>
				</Link>
			</div>
			<div className="order-header">
				<h1
					style={{
						textAlign: 'center',
						width: '100%',
						margin: '20px auto',
						justifyContent: 'center'
					}}
				>
					Users
				</h1>
			</div>

			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{users && (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>FIRST</th>
									<th>LAST</th>
									<th>EMAIL</th>
									<th>Affiliated</th>
									<th>VERIFIED</th>
									<th>ADMIN</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(user)
										}}
									>
										<td className="p-10px">{user._id}</td>
										<td className="p-10px">{format_date(user.createdAt)}</td>
										<td className="p-10px">{user.first_name}</td>
										<td className="p-10px">{user.last_name}</td>
										<td className="p-10px">{user.email}</td>
										{/* <td className="p-10px">{user.affiliate}</td> */}
										<td className="p-10px">
											{user.is_affiliated ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{user.isVerified ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{user.isAdmin ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/edituser/' + user._id}>
													<button className="btn icon">
														<i className="fas fa-info-circle" />
													</button>
												</Link>
												<Link to={'/secure/glow/userprofile/' + user._id}>
													<button className="btn icon">
														<i className="fas fa-mountain" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(user)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default UsersPage;
