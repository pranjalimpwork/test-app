import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { RiRefreshFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import yello from '../img/yello.jpg';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import addtocart from '../img/addtocart.jpg';
import CatThings from './CatThings';
import { firestore } from '../firebase.config';
import { collection, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import UserDetailModal from './UserModal';
const CanisterContainer = () => {
  const [{ cartShow, user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const ShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const cartItemRef = doc(firestore, 'cart', itemId); // Reference the specific item document
      console.log('cartItemRef', itemId);
      await updateDoc(cartItemRef, { qty: newQuantity });
      console.log('Item quantity updated:', itemId); // For debugging purposes

      // Update the state with the updated cart items (optional)
      const updatedCartItems = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const cartItemRef = doc(firestore, 'cart', itemId); // Reference the specific item document

      const res = await deleteDoc(cartItemRef);
      console.log('Item deleted from cart:', res); // For debugging purposes

      const updatedCartItems = cartItems.filter((item) => item.itemId !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  function calculateTotalPrice(items) {
    // Check if items is an array
    if (!Array.isArray(items)) {
      throw new Error('Input must be an array');
    }

    // Reduce function to iterate and accumulate total price
    const totalPrice = items.reduce((accumulator, currentItem) => {
      // Check if currentItem has a price property (assuming it's a number)

      return accumulator + Number(currentItem.price);
    }, 0);

    return totalPrice;
  }

  async function clearCart() {
    try {
      cartItems.forEach((data) => {});
      for (const data of cartItems) {
        await deleteDoc(doc(firestore, 'cart', data?.itemId));
      }
      setCartItems([]);

      console.log('Cart cleared successfully.');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }

  const getCartItems = async () => {
    const cartRef = collection(firestore, 'cart');
    const q = query(cartRef);

    try {
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        itemId: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      console.log('items', items);
    } catch (error) {
      console.error('Error getting cart items:', error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex
    flex-col z-[101]'
    >
      <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
        <motion.div whileTap={{ scale: 0.75 }} onClick={ShowCart}>
          <FaArrowAltCircleLeft className='text-textColor text-3xl' />
        </motion.div>
        <p className='text-textColor text-lg font-semibold'>Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100
                rounded-md hover:shadow-md 
               cursor-pointer text-textColor text-base'
          onClick={() => {
            clearCart();
          }}
        >
          clear
          <RiRefreshFill />
          {''}
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full bg-orange-500 rounded-t-[2rem] flex flex-col'>
          {/* cart item section*/}
          <div
            className='w-full h-340 md:h-42 px-6 py-10 flex flex-col
              gap-3 overflow-scroll scrollbar-none'
          >
            {/* cart item */}
            {cartItems && cartItems.map((item) => <CatThings key={item?.id} item={item} remove={() => handleDeleteItem(item?.itemId)} />)}
          </div>
          {/* cart total section*/}
          <div
            className='w-full flex-1 bg-green-700 rounded-t-[2rem] flex flex-col
               items-center justify-center px-8 py-2 gap-4'
          >
            <div className='w-full flex items-center justify-between'>
              <p className='text-white text-lg'>Sub Total</p>
              <p className='text-white text-lg'>${calculateTotalPrice(cartItems)}</p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p className='text-white text-lg'>Delivery</p>
              <p className='text-white text-lg'>$200</p>
            </div>

            <div className='w-full border-b text-gray-600 my-2'></div>

            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-200 text-lg font-semibold'>Total</p>
              <p className='text-gray-200 text-lg font-semibold'>${calculateTotalPrice(cartItems) + 200}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type='button'
                className='w-full p-2 rounded-full bg-white text-green-700
                  text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Check out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type='button'
                className='w-full p-2 rounded-full bg-white text-green-700
                  text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'
              >
                Login to Check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={addtocart} className='w-full' alt='load' />
          <p className='text-xl text-textColor font-semibold'>Add to book your cylinder</p>
        </div>
      )}

      <UserDetailModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSubmit={() => {
          setIsOpen(false);
        }}
      />
    </motion.div>
  );
};

export default CanisterContainer;
