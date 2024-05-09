import React, { useEffect, useState } from 'react';
import { GiAutoRepair, GiCatapult } from 'react-icons/gi';
import { categories } from '../utils/Data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MoreContainer = ({ allitems }) => {
  const [filter, setfilter] = useState('LPG gas');

  console.log('allitems', allitems);

  return (
    <section className='w-full my-6 ' id='more'>
      <div className='w-full flex flex-col items-center justify-center'>
        <p
          className='text-2xl font-semibold capitalised text-headingColor 
        relative before:absolute before:rounded-lg before:content
        before:w-16 before:h-1 before:-bottom-3 before:left-0 before:bg-gradient-to-tr
        from-orange-400 to-orange-700 teansition-all ease-in-out duration-100 mr-auto'
        >
          more tools Service
        </p>

        <div
          className='w-full flex items-center 
              justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'
        >
          {categories &&
            categories.map((catagary) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={catagary.id}
                className={`group ${filter === catagary.urlparamName ? 'bg-orange-400' : 'bg-gray-200'} 
                w-24 min-w-[94px] 
                h-28 cursor-pointer rounded-lg drop-shadow-2xl flex flex-col gap-3
                 items-center justify-center hover:bg-orange-400 duration-150 transition-all ease-in-out`}
                onClick={() => setfilter(catagary.urlparamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${filter === catagary.urlparamName ? 'bg-gray-200' : 'bg-orange-400'}
                     group-hover:bg-gray-200 flex items-center
                    justify-center`}
                >
                  <GiAutoRepair
                    className={`${filter === catagary.urlparamName ? 'text-textColor' : 'text-white'}
                         group-hover:text-textColor text-2xl `}
                  />
                </div>
                <p className='text-sm text-textColor group- hover:text-gray-300'>{catagary.name}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MoreContainer;
