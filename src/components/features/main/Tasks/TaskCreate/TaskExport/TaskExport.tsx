import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useContext } from 'react';
import { Base64 } from 'js-base64';
import { toast } from 'react-toastify';
import { TaskContext } from '../TaskContext';

export const TaskExport = () => {
  const {setUploudedTask} = useContext(TaskContext)

 const importFromJson = (file: RcFile) => {
  if(file.type !== 'application/json') {
    toast.error('Invalid file type')
    return false
  }
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const text = reader.result

        if(typeof text === 'string') {
          const extractedStr = text.match('base64,(.*)')![1];
          const strToBase64 = Base64.decode(extractedStr);
          setUploudedTask(JSON.parse(strToBase64))
        } else {
         toast.error('File load error')
       }
      };
    });
  }

	return (
		<>
			<Upload name='File' accept={'.json'} beforeUpload={(file) => importFromJson(file)}>
         <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
		</>
	);
};
