import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import CartIcon  from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
        SIGN OUT
        </div>
        ) : (
        <Link className='option' to='/signin'>
        SIGN IN
        </Link>
        )}
      <CartIcon/>
    </div>{
      hidden ? null :
    <CartDropdown />
    }
  </div>
);


// Section 8: 100.connect() and mapStateToProps()
// We will extract whenever we need properties from our reducers.
// .connect is a Higher Order Component that takes 2 args.
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);