import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/hompage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions';

// 'extends' means that 'App' class will inherit all the methods available in the 'Component class'.
// '.super()' calls the constuctor of the parent-class form wich 'App' is a sub-class(child-class).
// 'class' is a sintátical sugar for 'Constructor Function'.
class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if (userAuth) {
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
         setCurrentUser({
           id: snapShot.id,
           ...snapShot.data()
         });
        });
      } else {
       //If userAuth is false then... to null.
       setCurrentUser(userAuth);
     }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
 setCurrentUser: user => dispatch(setCurrentUser(user))
});

// 'default' means the main object exported from a module.
export default connect(null, mapDispatchToProps )(App);
