import React  from 'react';
import { Link } from 'react-router-dom';
import { List, Divider, Button, Space } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import Popup from '../Popup';
import { useState } from 'react';

const RestaurantList = ({ restaurants, title }) => {
  let data = [];
  const [popupState, setPopupState] = useState(false);
  const [popupData, setPopupData] = useState({});

  if (!restaurants.length) {
    return <h3>No Restaurants are open yet</h3>;
  }
  if( restaurants) {
    restaurants.map((restaurant) => {
    const {name, passcode, _id, barcode=""} = restaurant;
      data.push({'name' : name, 'passcode' : passcode, 'id' : _id , 'barcode': barcode});
    });
  } 
  const IconText = ({ icon, text }) => (
    <Space>
      { React.createElement(icon)}
      {text}
    </Space>
  );

  const handleCheckin = (item) => {
    setPopupState(!popupState);
    setPopupData(item);
  }

  const childHandleCheckin = () => {
    setPopupState(!popupState);
  }

  return (
    <>
    <Divider orientation="left">Available Restaurants</Divider>
    <List
      size="large"
      header={<div></div>}
      footer={<div></div>}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item
        key={item.id}
        actions={[
          <IconText icon={StarOutlined} key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} key="list-verstical-like-o" />,
          <Button type="primary" onClick={() => handleCheckin(item)}> Check-in </Button>
        ]}
        > 
           {item.name}
        </List.Item>
      )}
    />
    { popupState ? (<Popup toggle={childHandleCheckin} visible={popupState} popupdata={popupData}/>): null }
  </>
  );
};

export default RestaurantList;
