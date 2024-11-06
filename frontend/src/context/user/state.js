import { useReducer } from 'react';
import Reducer from './reducer';
import { Actions } from './action';
import api from '../../service';
import { type } from '@testing-library/user-event/dist/type';

export const intialState = {
	titles: null,
};

export const UserState = (props) => {
	const [state, dispatch] = useReducer(Reducer, intialState);

	const loginUsingPassword = async (payload) => {
		try {
			const response = await api.post(`/auth/login`, payload);
			const { token } = response?.data;

			if (token) {
				const filteredToken = token?.split(' ')?.[1]?.trim();
				localStorage.setItem('usertoken', filteredToken);
				return [true];
			} else {
				return [false, 'No token received!'];
			}
		} catch (error) {
			return [false];
		}
	};

	const signUp = async (payload) => {
		try {
			const response = await api.post(`/auth/register`, payload);
			const { user } = response?.data;
			if (user) {
				return [true];
			} else {
				return [false, 'Email Id already registered'];
			}
		} catch (error) {
			return [false];
		}
	};

	const addTitle = async (payload) => {
		try {
			const response = await api.post(`/title`, payload);
			const data = response?.data;
			if (data) {
				return [true, data];
			} else {
				return [false];
			}
		} catch (error) {
			return [false];
		}
	};

	const getAllTitle = async () => {
		try {
			const response = await api.get(`/title`);
			const data = response?.data;
			if (data) {
				dispatch({
					type: Actions.GET_ALL_TITLES_SUCCESS,
					payload: data,
				});
			}
		} catch (error) {
			return [false];
		}
	};

	const removeTitle = async (titleId) => {
		try {
			const response = await api.delete(`/title?id=${titleId}`);
			const data = response?.data;
			if (data) {
				return [true];
			} else {
				return [false];
			}
		} catch (error) {
			return [false];
		}
	};

	return {
		...state,
		loginUsingPassword,
		signUp,
		addTitle,
		getAllTitle,
		removeTitle,
	};
};
