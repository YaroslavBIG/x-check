import React from 'react';
import { Button } from 'antd';
import { useFirebase } from 'react-redux-firebase';

const CustomHeader = () => {
  const firebase = useFirebase();

  return (
    <div>
      <Button onClick={() => firebase.logout()}>Sign out</Button>
    </div>
  );
};

export default CustomHeader;
