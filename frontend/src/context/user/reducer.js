import { intialState } from './state';
const actionHandlers = {
	INCREASE_COUNT: (state, action) => ({ ...state, count: state.count + 1 }),
	GET_ALL_TITLES_SUCCESS: (state, action) => ({
		...state,
		titles: action.payload,
	}),
	RESET_STATE: () => ({ ...intialState }),
};

const Reducer = (state, action) => {
	const handler = actionHandlers[action.type];
	return handler ? handler(state, action) : state;
};

export default Reducer;
