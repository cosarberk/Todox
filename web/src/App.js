import React, { Suspense } from 'react';


import { Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import MainLayout from './layouts/MainLayouts';
import AddTodoPage from './pages/AddTodoPage';


function Error404() {
  return (
    <div>
      <h2>PAGE NOT FOUND</h2>
    </div>
  )
}




function App() {



  return (
    <Suspense fallback={<p>Loading....</p>} >
      <Routes>
        <Route >
          <Route path="/" element={<LoginPage />} />
          <Route path="Signup" element={<SignupPage />} />
        </Route>

        <Route path="/Todox" element={<MainLayout />}>
     
          <Route path="Todos" element={<MainPage />} />
          <Route path="Settings" element={<SettingsPage />} />
          <Route path="AddTodos" element={<AddTodoPage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>

  );
}

export default App;
