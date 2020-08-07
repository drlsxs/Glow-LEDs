export {};
import express from 'express';
import User from '../models/user';
const { getToken, isAuth } = require('../util');
import bcrypt from 'bcryptjs';
require('dotenv');

const router = express.Router();

router.put('/resetpassword', async (req, res) => {
	console.log({ resetpassword: req.body });
	try {
		const user: any = await User.findOne({ _id: req.body.user_id });
		if (!user) {
			return res.status(400).json({ email: 'User Does Not Exist' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(req.body.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					user.password = hash;
					await user.save();
					res.status(202).send({ msg: 'Password Saved' });
				});
			});
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.post('/passwordreset', async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email });
		console.log({ user });
		if (user) {
			res.send(user);
		} else {
			res.status(404).send({ msg: 'User Not Found' });
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.put('/update/:id', isAuth, async (req, res) => {
	console.log('/update/:id');
	// try {
	const userId = req.params.id;

	const user: any = await User.findById(userId);
	if (user) {
		user.first_name = req.body.first_name || user.first_name;
		user.last_name = req.body.last_name || user.last_name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;
		user.isAdmin = req.body.isAdmin || user.isAdmin;
		user.isVerified = req.body.isVerified || user.isVerified;
		if (req.body.password) {
			console.log('password');
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(user.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					user.password = hash;
					await user.save();
				});
			});
		}

		user.isVerified = req.body.isVerified || user.isVerified;
		const updatedUser = await user.save();
		res.send({
			_id: updatedUser.id,
			first_name: updatedUser.first_name,
			last_name: updatedUser.last_name,
			email: updatedUser.email,
			isVerified: updatedUser.isVerified,
			token: getToken(updatedUser)
		});
	} else {
		res.status(404).send({ msg: 'User Not Found' });
	}
	// } catch (error) {
	// 	console.log(error);
	// 	res.send(error);
	// }
});

router.put('/verify/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		console.log({ verify: userId });
		const user: any = await User.findById(userId);
		if (user) {
			user.first_name = req.body.first_name || user.first_name;
			user.last_name = req.body.last_name || user.last_name;
			user.email = req.body.email || user.email;
			user.password = req.body.password || user.password;
			user.isAdmin = req.body.isAdmin || user.isAdmin;
			user.isVerified = true;
			const updatedUser = await user.save();
			res.send({
				_id: updatedUser.id,
				first_name: updatedUser.first_name,
				last_name: updatedUser.last_name,
				email: updatedUser.email
				// isVerified: updatedUser.isVerified,
				// token: getToken(updatedUser)
			});
			// res.status(202).send({ msg: 'Verified Account' });
		} else {
			res.status(404).send({ msg: 'User Not Found' });
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.post('/login', async (req, res) => {
	// try {
	const email = req.body.email;
	const password = req.body.password;

	const login_user: any = await User.findOne({ email });
	if (!login_user) {
		return res.status(404).json({ emailnotfound: 'Email not found' });
	}
	if (!login_user.isVerified) {
		return res.status(404).json({ emailnotfound: 'Account not Verified' });
	}
	// Check password
	const isMatch = await bcrypt.compare(password, login_user.password);
	if (isMatch) {
		res.send({
			_id: login_user.id,
			first_name: login_user.first_name,
			last_name: login_user.last_name,
			email: login_user.email,
			isAdmin: login_user.isAdmin,
			isVerified: login_user.isVerified,
			token: getToken(login_user)
		});
	} else {
		return res.status(400).json({ passwordincorrect: 'Password incorrect' });
	}
	// } catch (error) {
	// 	console.log(error);
	// 	res.send(error);
	// }
});

router.post('/register', async (req, res) => {
	try {
		const newUser: any = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			isAdmin: false,
			isVerified: false
		});
		const user = await User.findOne({ email: newUser.email });
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(newUser.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					newUser.password = hash;
					await newUser.save();
					res.json({
						_id: newUser.id,
						first_name: newUser.first_name,
						last_name: newUser.last_name,
						email: newUser.email,
						isAdmin: newUser.isAdmin,
						isVerified: newUser.isVerified,
						token: getToken(newUser)
					});
				});
			});
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.post('/getuser/:id', async (req, res) => {
	try {
		const user: any = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(400).json({ email: "User Doesn't Exist" });
		}
		// Check password
		const isMatch = await bcrypt.compare(req.body.current_password, user.password);
		if (isMatch) {
			// console.log({ user })
			res.send({
				_id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin,
				token: getToken(user)
			});
		} else {
			return res.send(false);
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/createadmin', async (req, res) => {
	try {
		const admin: any = new User({
			first_name: 'Kurt',
			last_name: 'LaVacque',
			email: 'lavacquek@icloud.com',
			password: 'admin',
			isVerified: true,
			isAdmin: true
		});
		const user = await User.findOne({ email: admin.email });
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		} else {
			bcrypt.genSalt(10, (err: any, salt: any) => {
				bcrypt.hash(admin.password, salt, async (err: any, hash: any) => {
					if (err) throw err;
					admin.password = hash;
					await admin.save();
					res.json({
						_id: admin.id,
						first_name: admin.first_name,
						last_name: admin.last_name,
						email: admin.email,
						isAdmin: admin.isAdmin,
						isVerified: admin.isVerified,
						token: getToken(admin)
					});
				});
			});
		}
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

export default router;
