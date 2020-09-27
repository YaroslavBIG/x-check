import React from 'react';
import styles from './HeaderRequests.module.scss';

import 'antd/dist/antd.css';
import { Typography, Space } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const { Text } = Typography;

const HeaderRequests = () => {
	return (
		<Space className={styles.headerRequests__container}>
			<Text className={styles.headerRequests__text} type='secondary'>
				20 found
			</Text>
			<SyncOutlined className={styles.headerRequests__refresh} />
		</Space>
	);
};

export default HeaderRequests;
