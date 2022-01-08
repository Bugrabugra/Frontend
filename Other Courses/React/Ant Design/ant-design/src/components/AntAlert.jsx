/* eslint-disable no-unused-vars */
import { Alert } from "antd";
import React, { useState } from 'react'

const AntAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  
  return (
    <div>
      <p>Alert</p>
      {showAlert && (
        <Alert
          closable
          type="error"
          message="Error"
          description="There was an error"
        />
      )}
    </div>
  );
}

export default AntAlert
