import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/loyalty.jpg'
import Auth from '../../utils/auth';

import { Layout, Menu, Button, Image } from 'antd';
const { Header } = Layout;


const AppHeader = () => {
  const [menuState, setMenuState] = useState({ current: 'home'});

  const logout = (event) => {
    setMenuState({ current: 'home' });
    Auth.logout();
  };

  const handleClick = (e) => {
    setMenuState({ current: e.key });
  };

  return (
    <Header style ={{width:"100%"}}>
       <Menu theme="dark" mode="horizontal" onClick={handleClick} defaultSelectedKeys={['home']} selectedKeys={[menuState.current]}>
       { Auth.loggedIn() ? (   <>
        <Menu.Item key="home"><Link to="/home"> Home </Link></Menu.Item>
        <Menu.Item key="me"><Link to="/me"> My Profile </Link></Menu.Item>
        <Menu.Item key="checkin"><Link to="/checkin">Checkin History </Link></Menu.Item>
        <Menu.Item key= "logout" onClick={logout} >Logout</Menu.Item> </> ) : null
       }
      </Menu>
    </Header>
  );
};

export default AppHeader;
