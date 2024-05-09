import React, { useState, useEffect } from 'react';
import { TbCylinderPlus } from 'react-icons/tb';
import { MdAdd } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase.config';

import Logo from './img/logo.jpg';
import avt from './img/avt.png';
import { Link, json } from 'react-router-dom';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { firestore } from '../firebase.config';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [cartItems, setCartItems] = useState([]);

  const [{ user, cartShow }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const ShowCart = () => {
    if (!user) {
      login();
      return;
    }
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    const cartRef = collection(firestore, 'cart');
    const unsubscribe = onSnapshot(cartRef, (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        itemId: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      console.log('Cart items updated:', items); // For debugging purposes
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
      {/* dekstop and tablet*/}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/*'} className='flex items-center gap-2'>
          <img src={Logo} className='w-8 object-cover rounded-full' alt='logo' />
          <p className='text-headingColor text-x1 font-bold'>Gas Agency</p>
        </Link>
        <div className='flex items-center'>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-12'
          >
            <li
              className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer'
            >
              Home
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer'
            >
              More
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100
               transition-all ease-in-out cursor-pointer'
            >
              About us
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer'
            >
              Service
            </li>
          </motion.ul>
          <div className='relative flex items-center justify-center' onClick={ShowCart}>
            <TbCylinderPlus className='text-textColor text-2xl ml-8 cursor-pointer' />
            {cartItems && cartItems.length > 0 && (
              <div
                className=' absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex 
               items-center justify-center'
              >
                <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
              </div>
            )}
          </div>

          <div className='relative'>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avt}
              className=' absolute -top-5 -right-12  w-8 min-w-[40px] h-8 min-h-[40px] 
              drop-shadow-x1 cursor-pointer rounded-full '
              alt='userprofile'
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex-col 
                absolute top-4 -right-6'
              >
                {user && user.email === 'aaahisoni9@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p
                      className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                 transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>{' '}
                  </Link>
                )}
                <p
                  className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
              transition-all duration-100 ease-in-out text-textColor text-base'
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
      <div className='flex items-center justify-between md:hidden w-full h-full '>
        <div
          className='relative flex items-center justify-center'
          onClick={() => {
            user ? ShowCart() : login();
          }}
        >
          <TbCylinderPlus className='text-textColor text-2xl ml-8 cursor-pointer' />
          {cartItems && cartItems.length > 0 && (
            <div
              className=' absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex 
               items-center justify-center'
            >
              <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
            </div>
          )}
        </div>
        <Link to={'/*'} className='flex items-center gap-2'>
          <img src={Logo} className='w-8 object-cover rounded-full' alt='logo' />
          <p className='text-headingColor text-x1 font-bold'>Gas Agency</p>
        </Link>

        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avt}
            className=' w-8 min-w-[40px] h-8 min-h-[40px] 
              drop-shadow-x1 cursor-pointer rounded-full '
            alt='userprofile'
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex-col 
                absolute top-4 -right-6'
            >
              {user && user.email === 'aaahisoni9@gmail.com' && (
                <Link to={'/createItem'}>
                  <p
                    className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                  transition-all duration-100 ease-in-out text-textColor'
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className='flex flex-col'>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                >
                  Home
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                >
                  More
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100
               transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                >
                  About us
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                >
                  Service
                </li>
              </ul>
              <p
                className='m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer 
                justify-center bg-gray-200 hover:bg-slate-300
                transition-all duration-100 ease-in-out text-textColor text-base'
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
