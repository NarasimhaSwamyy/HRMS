import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Signin from './Signin';
import Gc from './Gc';
import { ResetPassword } from './Forgot';

function App() {
  const [usercon, setUsercon] = useState({ "islogin": false, "token": "" });

  const updateusercon = (obj) => {
    setUsercon({ ...usercon, ...obj });
  }

  const obj = { "usercon": usercon, "updateusercon": updateusercon };

  return (
    <Router>
      <Gc.Provider value={obj}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
         
        </Routes>
      </Gc.Provider>
    </Router>
  );
}

export default App;
