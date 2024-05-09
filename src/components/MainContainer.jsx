import React, { useEffect, useRef, useState } from 'react';
import as2 from './img/as2.jpg';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { RiArrowRightSLine } from 'react-icons/ri';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MoreContainer from './MoreContainer';
import CanisterContainer from './CanisterContainer';
import { getAllitems } from '../utils/firebaseFunction';
const MainContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  const [scrollValue, setscrollValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {}, [scrollValue, cartShow]);

  const fetchData = async () => {
    setisLoading(true);
    const items = await getAllitems();
    setItems(items);
    setisLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='w-full h-auto flex flex-col items-center'>
      <HomeContainer />

      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p
            className='text-2xl font-semibold capitalised text-headingColor 
        relative before:absolute before:rounded-lg before:content
        before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr
        from-orange-400 to-orange-700 teansition-all ease-in-out duration-100'
          ></p>
          <div className='hid md:flex gap-3 items-center'>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className='w-8 h-8 rounded-lg  bg-orange-400 hover:bg-orange-600
          cursor-pointer transistion-all duration-100 ease-in-out
          hover:shadow-lg flex items-center justify-center'
              onClick={() => setscrollValue(-200)}
            >
              <RiArrowLeftSLine className='text-lg' />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className='w-8 h-8 rounded-lg  bg-orange-400 hover:bg-orange-600
          cursor-pointer transistion-all duration-100 ease-in-out
          hover:shadow-lg flex items-center justify-center'
              onClick={() => setscrollValue(+200)}
            >
              <RiArrowRightSLine className='text-lg' />
            </motion.div>
          </div>
        </div>
        {isLoading && (
          <p
            className='text-2xl font-semibold capitalised text-headingColor 
      relative before:absolute before:rounded-lg before:content
      before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr
      from-orange-400 to-orange-700 teansition-all ease-in-out duration-100'
          >
            Data is Loading
          </p>
        )}
        {!isLoading && <RowContainer scrollValue={scrollValue} flag={true} data={items?.filter((n) => n.catagory === 'bharat gas')} />}
      </section>
      {!isLoading && <MoreContainer allitems={items} />}
      {cartShow && <CanisterContainer />}
    </div>
  );
};

export default MainContainer;
