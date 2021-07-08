
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Slep from './component/Slep/Slep';
import Review from './component/Review/Review';
import fakeData from './fakeData';
import Shipment from './component/shipment/Shipment';
import Login from './component/login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const theme = createContext()

function App() {
  const [loginUser,setLoginUser] = useState(''); 
  return (
    <theme.Provider value={[loginUser,setLoginUser]} >
      <Header></Header>
      <Router>
          <Switch>
              <Route path="/shop" >
                <Shop></Shop>
              </Route>
              <Route path="/manage">
                <Slep></Slep>
              </Route>
              <Route path="/review" >
                <Review reviewData={fakeData} key={fakeData.key} ></Review>
              </Route>
              <Route path="/login" >
                <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route path="/">
                  <Shop></Shop>
              </Route>
          </Switch>
      </Router>
    </theme.Provider>
  );
}

export default App;
