import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('usertoken');
		if (!token) {
			return navigate('/');
		}
	}, []);

	return children;
};

export default memo(AuthWrapper);
