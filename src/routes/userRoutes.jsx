import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from '../components/RegisterPage';
import MainComponent from '../components/Main';
import MultiStepForm from '../components/MultiSetUp';
import SavedForm from '../components/SaveForm';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent/>} />
      <Route path='/multiform' element={<MultiStepForm/>}/>
      <Route path="/saved-form/:email" element={<SavedForm />} />
    </Routes>
  );
}
export default UserRoutes