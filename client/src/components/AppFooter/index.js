import React from 'react';
import { Layout, Menu, Button } from 'antd';
const { Footer } = Layout;


const AppFooter = () => {
  return (
    <Footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <h4>&copy; {new Date().getFullYear()} - Kunal Choudhary</h4>
      </div>
    </Footer>
  );
};

export default AppFooter;
