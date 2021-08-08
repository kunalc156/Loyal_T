import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import CheckinList from '../components/CheckinList';
import Auth from '../utils/auth';

import { QUERY_VISITS } from '../utils/queries';

const Checkin = () => {
  const { loading, data } = useQuery(QUERY_VISITS);

  console.log(data);
  const checkin = data?.visits || [];

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <div className="flex-row justify-center">
      {loading ? (
            <div>Loading...</div>
          ) : (
            <CheckinList
            checkin={checkin}
            />
          )}
      </div>
    </main>
  );
};

export default Checkin;
