import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Input, message, Carousel, Alert } from 'antd';
import Barcode from  'react-barcode';
import { useMutation } from '@apollo/client';
import { ADD_VISIT } from '../../utils/mutations';

const Popup = (props) => {
  let data = [];
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [passcode, setPasscode] = useState("");
  const [invalidPasscodeVisible, setInvalidPasscodeVisible] = useState(false);

  const handleClick = () => {
    props.toggle();
   };
  
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
        props.toggle();
        setConfirmLoading(false);
    }, 2000);
  };

  const onChange = (a, b, c) => {

  }
  
  const contentStyle = {
    lineHeight: '160px',
    textAlign: 'center',
    background: '#001529',
  };

  const textBoxChange = (event) => {
    setPasscode(event.target.value);
  }
  
  const [addVisit, { visitError }] = useMutation(ADD_VISIT);

  const handlePasscodeSubmit = async (restaurantId, actualPasscode) => {
    try {
      if( actualPasscode == passcode ) {
        const data = await addVisit({
            variables: { restaurantId },
        });
        setInvalidPasscodeVisible(false);
        setPasscode("");
        props.toggle();
        message.success("Checkin successfull");
      } else {
        setInvalidPasscodeVisible(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal
        title="Scan barcode or ask restaurant to enter passcode"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleClick}
      >
        <Carousel style={contentStyle} afterChange={onChange} dotPosition="bottom">
            <div> 
           { props.popupdata?.barcode  ? (<Barcode value={props.popupdata?.barcode} textMargin="2" marginTop="10px" height="80"/>) : (<p style={{color:"white", marginBottom:"40px"}}> Barcode is not available.</p>)}
            </div>
            <div>
            <p style={{color:"white"}}> Enter the secret code</p>
            <Input  onChange={textBoxChange} value={passcode}  style={{width:"150px", marginRight: "10px"}}/>
            <Button type="primary" onClick={() => handlePasscodeSubmit(props.popupdata?.id, props.popupdata.passcode)}>Validate</Button>
            </div>
        </Carousel>
        { invalidPasscodeVisible ? (    <Alert message="Invalid passcode" type="error" />) : null}

      </Modal>
      {visitError && (
              <Alert message={visitError.message} type="error" />
        )}
    </>
  );
};

export default Popup;
