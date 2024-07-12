import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const CustomModal = ({modalOpen, setModalOpen, text, actionFunction}) => {
  return (
    <>
      <Modal
        title="20px to Top"
        style={{
          top: 20,
        }}
        open={modalOpen}
        onOk={() => actionFunction()}
        onCancel={() => setModalOpen(false)}
      >
        <p>{text}</p>
      </Modal>
    
     
    </>
  );
};
export default CustomModal;