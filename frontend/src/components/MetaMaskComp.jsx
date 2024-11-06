import React from 'react';
import { useMetaMask } from 'metamask-react';
import { Button } from 'antd';

const MetaMaskComp = () => {
	const { status, connect, account, chainId } = useMetaMask();

	const compMapper = {
		connected: (
			<div>
				Connected account {account} on chain ID {chainId}
			</div>
		),
		initializing: <div>Synchronisation with MetaMask ongoing...</div>,
		notConnected: <Button onClick={connect}>Connect to MetaMask</Button>,
		connecting: <div>Connecting...</div>,
		unavailable: <div>MetaMask not available </div>,
	};

	return (
		<div
			style={{
				display: 'flex',
				marginTop: '24px',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '24px',
			}}
		>
			<span>Title Dashboard</span>

			{compMapper?.[status]}
		</div>
	);
};

export default MetaMaskComp;
