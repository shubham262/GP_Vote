import { UserState } from './user/state';

const CombineState = () => {
	return {
		userInfo: UserState(),
	};
};

export default CombineState;
