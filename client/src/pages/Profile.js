import React from 'react';
import { Card, Alert } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REMOVE_PROFILE } from '../utils/mutations';
import { Popconfirm, message } from 'antd';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();
  const { Meta } = Card;

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const confirm = async (e) => {

    console.log(profile);
    try {
      const { data } = await removeProfile({
        variables: { id: profile?._id },
      });
      message.success('Profile deleted successfully');
      setTimeout(() => {
        Auth.logout();
      }, 1500)
    } catch (e) {
      console.error(e);
      message.error('Something went wrong while deleting. Please try again.');

    }
  }
  
  const cancel = async (e) => {
    console.log(e);
    message.error('Click on No');
  }


  const [removeProfile, { deleteError, deleteData }] = useMutation(REMOVE_PROFILE);

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  /*if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  } */

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  if (!profile?.name) {
    return <Redirect to="/login" />;

  }

  return (
    <div className="flex-row justify-center mb-4 mt-4">
       {deleteError && (
              <Alert message={deleteError.message} type="error" />
        )}
      <div style= {{maxWidth: 400, margin: "20px" }}> 
        <h1>Welcome to Loyal-T </h1>
        <p>Welcome to your new LOYAL-T account! We hope you will enjoy it very much!
          With your LOYAL-T profile, you will have access to: </p>
          <ul>
            <li> Feature 1 </li>
            <li> Feature 2 </li>
            <li> Feature 3 </li>
          </ul>
          <p>If you have any questions, please contact our customer service team at kunal.choudhary156@gmail.com.</p>
      </div>
      <div >
        <Card
        style={{ margin: "auto", width: 300 , marginTop: "40px", maxWidth: 250 ,marginBottom:"40px"}} 
        actions={[
          <Popconfirm
          title="Are you sure to delete your profile?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          >     <a href="#">Delete Profile </a></Popconfirm> ,
        ]}
        cover={
          <img
            alt="example"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        }
      >
        <Meta
          title= "Name"
          description= {profile.name}
        />
        <Meta
          title= "Email"
          description={profile.email}
        
        />
      </Card>
      </div>
    </div>
  );
};

export default Profile;
