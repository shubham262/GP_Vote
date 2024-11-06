import React, { memo, useCallback, useState, useContext } from 'react';
import { Button, Input, message } from 'antd';
import { ReactComponent as MobileResponsiveIcon } from '../assets/svg/mobileResponsive.svg';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import validator from 'validator';
import Context from '../context/context';
import { useNavigate } from 'react-router-dom';
const Login = ({ updateStage }) => {
	const naigate = useNavigate();
	const {
		userInfo: { loginUsingPassword },
	} = useContext(Context);

	const [info, setInfo] = useState({
		email: '',
		password: '',
		loading: false,
	});

	const onInputChange = useCallback((e, type) => {
		setInfo((prev) => ({ ...prev, [type]: e?.target.value?.trim() }));
	}, []);

	const onLogin = useCallback(
		async (e) => {
			if (e.key !== 'Enter') {
				return;
			}
			if (info?.loading) {
				return;
			}
			if (!info.password?.length || !info.email?.length) {
				return message.error('All fields are required ');
			}
			if (!validator.isEmail(info?.email)) {
				return message.error('Invalid emailId ');
			}

			setInfo((prev) => ({ ...prev, loading: true }));

			const payload = {
				email: info.email,
				password: info.password,
			};

			const response = await loginUsingPassword(payload);
			if (response?.[0]) {
				message.success('Login successful');
				naigate('/home');
			}
			setInfo((prev) => ({ ...prev, loading: false }));
		},
		[info?.loading, info?.password, info?.email]
	);
	return (
		<>
			<div className="topWrapper">
				{/* icon Label */}
				<div className="iconContainer">
					<MobileResponsiveIcon />
				</div>
				<span className="welcomeText">Welcome </span>
				<span className="subHeaderTitle">Please sign in below.</span>
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
					onKeyDown={onLogin}
				/>
			</div>
			<div className="authfooter">
				<Button
					type="primary"
					loading={info?.loading}
					onClick={onLogin}
					className="googleBtn"
				>
					Sign in
				</Button>
				<Button
					type="link"
					style={{ alignSelf: 'flex-end' }}
					onClick={() => updateStage('signUp')}
				>
					Sign Up
				</Button>
			</div>
		</>
	);
};

export default memo(Login);
