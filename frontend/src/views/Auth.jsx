import React, { memo, useCallback, useMemo, useState } from 'react';
import '../assets/styles/auth/authHandler.scss';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Auth = () => {
	const [info, setInfo] = useState({
		stage: 'login', //login signUp
	});

	const updateStage = useCallback((type) => {
		setInfo((prev) => ({ ...prev, stage: type }));
	}, []);

	const compMapper = useMemo(() => {
		return {
			login: <Login updateStage={updateStage} />,
			signUp: <SignUp updateStage={updateStage} />,
		};
	}, []);

	return (
		<div className="authHandlerParentContainer">
			<div className="subContainer">
				<div className="contentContainer">
					<div className="contentCard">
						{compMapper?.[info?.stage]}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Auth);
