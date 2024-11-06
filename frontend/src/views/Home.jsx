/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	memo,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import '../assets/styles/homeStyling.css';
import { Button, message, Skeleton, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Context from '../context/context';
import MetaMaskComp from '../components/MetaMaskComp';
import { useMetaMask } from 'metamask-react';

const Home = () => {
	const {
		userInfo: { addTitle, getAllTitle, titles, removeTitle },
	} = useContext(Context);

	const { status } = useMetaMask();

	const [info, setInfo] = useState({
		titleData: [],
		titleInput: '',
		addTitleLoading: false,
		loading: true,
		removeTitleLoading: {},
	});

	useEffect(() => {
		getAllTitle();
	}, []);

	useEffect(() => {
		if (titles) {
			setInfo((prev) => ({ ...prev, titleData: titles, loading: false }));
		}
	}, [titles]);

	const addTitleFunc = useCallback(async () => {
		if (status !== 'connected') {
			return message.error('Please connect Wallet first!');
		}
		if (info?.addTitleLoading) {
			return;
		}
		if (!info?.titleInput?.length) {
			return message.error('Title is required');
		}
		setInfo((prev) => ({ ...prev, addTitleLoading: true }));
		const payload = {
			title: info?.titleInput,
		};
		const response = await addTitle(payload);
		if (response?.[0]) {
			const updatedTitledata = [...(info?.titleData || [])];
			updatedTitledata.unshift(response?.[1]);
			setInfo((prev) => ({
				...prev,
				titleData: updatedTitledata,
				titleInput: '',
			}));
		}
		setInfo((prev) => ({ ...prev, addTitleLoading: false }));
	}, [info?.titleInput, info?.addTitleLoading, info?.titleData, status]);

	const removeTitleFunc = useCallback(
		async (data, index) => {
			if (status !== 'connected') {
				return message.error('Please connect Wallet first!');
			}
			if (info?.removeTitleLoading?.[index]) {
				return;
			}
			setInfo((prev) => ({
				...prev,
				removeTitleLoading: {
					...prev.removeTitleLoading,
					[index]: true,
				},
			}));
			const response = await removeTitle(data?.uuid);
			if (response?.[0]) {
				message.success('Title removed successfully');
				const updatedTitleData = [...(info?.titleData || [])];

				if (index > -1) {
					updatedTitleData.splice(index, 1);
				}
				setInfo((prev) => ({ ...prev, titleData: updatedTitleData }));
			}
		},
		[info?.titleData, info?.removeTitleLoading, status]
	);

	const onTitleInputChange = useCallback((e) => {
		setInfo((prev) => ({ ...prev, titleInput: e.target.value }));
	}, []);

	return (
		<div className="home">
			<MetaMaskComp />
			<div className="titleLists">
				<div
					style={{
						display: 'flex',
						gap: '24px',
						alignItems: 'flex-end',
					}}
				>
					<input
						value={info?.titleInput}
						onChange={onTitleInputChange}
						className="titleInputForm"
						placeholder="Type here..."
						// onKeyDown={addTitleFunc}
					/>

					<Button
						type="primary"
						loading={info?.addTitleLoading}
						onClick={addTitleFunc}
						className="addtitleButtonContainer"
					>
						Add Title
					</Button>
				</div>
				{info?.loading ? (
					<>
						<Skeleton />
						<Skeleton />
					</>
				) : (
					info?.titleData?.map((e, index) => (
						<div
							key={index}
							className="titleCards"
							style={{
								backgroundColor:
									e?.status === 'completed'
										? '#eaf4e1'
										: '#f9f9f9',
								borderColor:
									e?.status === 'completed'
										? '#c7e2b4'
										: '#e0e0e0',
							}}
						>
							<div className="titleButtonWraper">
								<span className="radioButton"></span>

								{e?.title}
							</div>

							<span
								className="closeBtnWrapper"
								onClick={() => removeTitleFunc(e, index)}
							>
								{!info?.removeTitleLoading?.[index] ? (
									'X'
								) : (
									<Spin
										indicator={<LoadingOutlined spin />}
										size="small"
									/>
								)}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default memo(Home);
