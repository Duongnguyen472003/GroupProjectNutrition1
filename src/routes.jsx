import {Routes, Route} from 'react-router-dom'; // react-router-dom
import React from 'react'; // react

// Authenticated
// import {useAuth} from '../hooks/useAuth.jsx';

// Router
import Calories from './app/Calories.jsx';
import Layout from './Layout.jsx';
import BMI from './app/BMI.jsx'
import API from './app/API.jsx'


const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Calories />} />
          <Route path="Calories" element={<Calories />} />
          <Route path="BMI" element={<BMI />} />
          <Route path="API" element={<API />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
