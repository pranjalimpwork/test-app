import React, { useEffect, useRef, useState } from 'react';
import indiane from '../img/indiane.png';
import { TbCylinderPlus } from 'react-icons/tb';
import { motion } from 'framer-motion';
import hello from '../img/hello.jpg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { addDoc, collection } from 'firebase/firestore';
import { app, firestore } from '../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [items, setItems] = useState([]);

  const [{ user, cartItems }, dispatch] = useStateValue();

  const addtocart = async (item) => {
    if (!user) {
      login();
    }
    if (!item) return;
    try {
      const cartRef = collection(firestore, 'cart');
      // Add quantity property
      await addDoc(cartRef, item);
      console.log('Item added to cart:', item);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

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
    }
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 
        my-12 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center h-420'}`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            className='w-300 h-[225px] min-w-[300px] md:w-340 md-min-w-[340px]
               bg-gray-100 rounded-lg p-2 mt-12 backdrop-blur-lg
                 hover:drop-shadow-lg flex flex-col items-center justify-between'
          >
            <div className='w-full flex items-center justify-between'>
              <motion.img whileHover={{ scale: 1.2 }} src={item?.imageURL} alt='item picture' className='w-40 -mt-8 drop-shadow-2xl' />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className='w-8 h-8 rounded-full bg-red-600 flex items-center 
                     justify-center cursor-pointer hover:shadow-md'
                onClick={() => addtocart(item)}
              >
                <TbCylinderPlus className='text-white' />
              </motion.div>
            </div>

            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
              <p className='mt-1 text-sm text-gray-500'>{item?.liter}liter</p>
              <div className='flex item-center  gap-8'>
                <p className='text-lg text-textColor font-semibold'>
                  <span className='text-sm text-red-500'>$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
