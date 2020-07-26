import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/landing';
import Navbar from './components/Navbar/navbar';
import Login from './components/Login/login';
import SignUp from './components/Signup/signup';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './alert/alert';
import { loadUser } from './actions/auth';
import setUserToken from './helper/helper';
import DashBoard from './components/dashboard/dashboard';
import CreateProfile from './components/profile/create-profile';
import PrivateRoute from './routing/privateroute';
import EditProfile from './components/profile/edit-profile';
import AddExp from './components/profile/addexp';
import AddEdu from './components/profile/addedu';
import ProfileView from './components/profile/profileview';
import Profiles from './components/profile/profiles';
import Posts from './components/posts/posts';
import ShowSinglePost from './components/posts/showSinglePost';

if (localStorage.token) {
  setUserToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [localStorage.token]);


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
          </section>
          <section className='container'>
            <Switch>
              <Route exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute
                exact
                path='/posts/:id'
                component={ShowSinglePost}
              />
              <PrivateRoute exact path='/dashboard' component={DashBoard} />
              <PrivateRoute
                exact
                path='/createprofile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/editprofile' component={EditProfile} />
              <PrivateRoute exact path='/addexperience' component={AddExp} />
              <PrivateRoute exact path='/addeducation' component={AddEdu} />
              <Route exact pathInfo='/login' path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/:id' component={ProfileView} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
