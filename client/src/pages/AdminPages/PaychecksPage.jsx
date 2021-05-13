import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPaychecks, deletePaycheck } from '../../actions/paycheckActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';

const PaychecksPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const paycheckList = useSelector((state) => state.paycheckList);
	const { loading, paychecks, error } = paycheckList;

	const paycheckSave = useSelector((state) => state.paycheckSave);
	const { success: successSave } = paycheckSave;

	const paycheckDelete = useSelector((state) => state.paycheckDelete);
	const { success: successDelete } = paycheckDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listPaychecks());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPaychecks(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPaychecks(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listPaychecks(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (paycheck) => {
		dispatch(deletePaycheck(paycheck._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Paid', color: '#3e4c6d' }, { name: 'Not Paid', color: '#6f3c3c' } ];

	const determine_color = (paycheck) => {
		let result = '';
		if (paycheck.paid) {
			result = colors[0].color;
		}
		if (!paycheck.paid) {
			result = colors[1].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Paychecks | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color) => {
						return (
							<div className="wrap jc-b  m-1rem">
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
				</div>
				<Link to="/secure/glow/editpaycheck">
					<button className="btn primary">Create Paycheck</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Paychecks</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{paychecks && (
					<div className="paycheck-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Date Paid</th>
									<th>Affiliate</th>
									<th>Amount</th>
									<th>Venmo</th>
									<th>Receipt</th>
									<th>Paid</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{paychecks.map((paycheck) => (
									<tr
										key={paycheck._id}
										style={{
											backgroundColor: determine_color(paycheck),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{paycheck.paid_at && format_date(paycheck.paid_at)}
										</td>
										<td className="p-10px">{paycheck.affiliate.artist_name}</td>
										<td className="p-10px">{paycheck.amount}</td>
										<td className="p-10px">{paycheck.venmo}</td>
										<td className="p-10px">{paycheck.receipt}</td>
										<td className="p-10px">
											{paycheck.paid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editpaycheck/' + paycheck._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(paycheck)}>
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
export default PaychecksPage;
