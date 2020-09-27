import React, { useContext, useState } from 'react';
import styles from './TopPanelRequests.module.scss';
import { Button, Form } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import RequestForm from '../../RequestForm/RequestForm';
import confirm from 'antd/lib/modal/confirm';
import { toast } from 'react-toastify';
import { useFirestore } from 'react-redux-firebase';
import { RequestsContext } from '../RequestsContext/RequestsContext';

const TopPanelRequests = () => {
	const [ isVisible, setVisibility ] = useState(false);
  const [ form ] = Form.useForm();
  const {
        selectedRequests,
        setSelectedRequests,
				} = useContext(RequestsContext)

  const updFirestore = useFirestore();

  const deleteFromFirebase = async (docName: string) => {
    try {
      updFirestore.collection('requests').doc(docName).delete()
    } catch (error) {
      toast.error(error)
    }
  }

  const deleteDocs = async (array: string[]) => {
  for (const item of array) {
    await deleteFromFirebase(item);
  }
    toast.success('Request deleted')
  }

  const showConfirm = () => {
		confirm({
			title: 'Delete Sessions',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to delete the selected sessions?',
			onOk() {
				if(selectedRequests?.length){
          deleteDocs(selectedRequests)
        }
        setSelectedRequests([]);
			}
		});
	}



	const handleClose = () => {
		setVisibility(false);
		form.resetFields();
  };

	return (
		<div className={styles.topPanelRequests__container}>
			<div className={styles.topPanelRequests__crud}>
				<Button
					danger
					icon={<DeleteOutlined />}
					disabled={false}
					className={'tasks-header--button'}
					onClick={showConfirm}
				/>
				{/* <Button type="default"><DeleteOutlined className={styles.topPanelRequests__crud__delete} /></Button> */}
				<EditOutlined className={styles.topPanelRequests__crud__edit} />
				<Button
					className={styles.topPanelRequests__crud__btn}
					onClick={() => setVisibility(true)}
					type='primary'
				>
					Create
				</Button>
				<RequestForm isVisible={isVisible} onClose={handleClose} form={form} />
				<InfoCircleOutlined className={styles.topPanelRequests__crud__info} />
			</div>
		</div>
	);
};

export default TopPanelRequests;
