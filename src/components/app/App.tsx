import React, { useState } from 'react';
import 'antd/dist/antd.css';
import NavigationPanel from '../features/NavigationPanel/NavigationPanel';

const App = () => {

  const [status, setStatus] = useState(false)

  const onToggleHandler = () => {
      setStatus(!status)
  }

  return (
    <>
      <NavigationPanel
        collapsed={status}
        onToggle={onToggleHandler}
      />
    </>
  );
};

export default App;
