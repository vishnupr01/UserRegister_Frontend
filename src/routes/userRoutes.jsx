import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from '../components/RegisterPage';
import MainComponent from '../components/Main';
import MultiStepForm from '../components/MultiSetUp';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent/>} />
      <Route path='/multiform' element={<MultiStepForm/>}/>
    </Routes>
  );
}
export default UserRoutes