import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/hompage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';

// 'extends' means that 'App' class will inherit all the methods available in the 'Component class'.
// '.super()' calls the constuctor of the parent-class form wich 'App' is a sub-class(child-class).
// 'class' is a sintátical sugar for 'Constructor Function'.
class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if (userAuth) {
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
         this.setState({
           currentUser: {
             id: snapShot.id,
             ...snapShot.data()
           }
         }, () => {
           console.log(this.state);
         }
        );
      });
         
     } else {
       //If userAuth is false then... to null.
       this.setState({currentUser:userAuth});
     }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

// The main object exportet from a module.
export default App;
