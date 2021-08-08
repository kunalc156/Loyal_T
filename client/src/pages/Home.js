import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import RestaurantList from '../components/RestaurantList';
import Auth from '../utils/auth';

import { QUERY_RESTAURANTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RESTAURANTS);
  const restaurants = data?.restaurants || [];
console.log(restaurants)
  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RestaurantList
            restaurants={restaurants}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
