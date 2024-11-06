import React, { memo, useCallback, useContext, useState } from 'react';
import { Button, Input, message } from 'antd';
import { ReactComponent as MobileResponsiveIcon } from '../assets/svg/mobileResponsive.svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import validator from 'validator';
import Context from '../context/context';
const SignUp = ({ updateStage }) => {
	const {
		userInfo: { signUp },
	} = useContext(Context);

	const [info, setInfo] = useState({
		email: '',
		password: '',
		loading: false,
		username: '',
	});

	const onInputChange = useCallback((e, type) => {
		let value = e.target.value;
		if (type !== 'username') {
			value = value?.trim();
		}
		setInfo((prev) => ({ ...prev, [type]: value }));
	}, []);

	const signUpClick = useCallback(
		async (e) => {
			if (e.key !== 'Enter') {
				return;
			}
			if (info?.loading) {
				return;
			}
			if (
				!info.username?.length ||
				!info.password?.length ||
				!info.email?.length
			) {
				return message.error('All fields are required ');
			}
			if (!validator.isEmail(info?.email)) {
				return message.error('Invalid emailId ');
			}

			setInfo((prev) => ({ ...prev, loading: true }));

			const payload = {
				username: info?.username,
				email: info?.email,
				password: info?.password,
			};

			const response = await signUp(payload);
			if (response?.[0]) {
				message.success('User registered successfully');
				updateStage('login');
			} else {
				message.error(response?.[1] || 'something went wrong');
			}
			setInfo((prev) => ({ ...prev, loading: false }));
			return;
		},
		[info?.loading, info?.username, info?.password, info?.email]
	);

	return (
		<>
			<div className="topWrapper">
				{/* icon Label */}
				<div className="iconContainer">
					<MobileResponsiveIcon />
				</div>
				<span className="welcomeText">Welcome </span>
				<span className="subHeaderTitle">Please sign up below.</span>
				<Input
					placeholder="username"
					autoFocus={true}
					value={info?.username}
					onChange={(e) => onInputChange(e, 'username')}
				/>
				<Input
					placeholder="you@gmail.com"
					autoFocus={true}
					value={info?.email}
					onChange={(e) => onInputChange(e, 'email')}
				/>
				<Input.Password
					placeholder="Enter password"
					iconRender={(visible) =>
						visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
					}
					value={info?.password}
					onChange={(e) => onInputChange(e, 'password')}
					onKeyDown={signUpClick}
				/>
			</div>
			<div className="authfooter">
				<Button
					type="primary"
					loading={info?.loading}
					onClick={signUpClick}
					className="googleBtn"
				>
					Sign up
				</Button>
				<Button
					type="link"
					style={{ alignSelf: 'flex-end' }}
					onClick={() => updateStage('login')}
				>
					Login
				</Button>
			</div>
		</>
	);
};

export default memo(SignUp);
