import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { motion } from 'framer-motion';

const CatThings = ({ item, remove }) => {
  return (
    <div>
      <div className=' w-full p-1 px-2 rounded-lg bg-green-500 flex items-center gap-2'>
        <img src={item?.imageURL} className='w-20 h-20 max-w-[60px] rounded-full object-contain' alt='' />
        {/* name section */}
        <div className='flex flex-col gap-2'>
          <p className='text-base text-green-800 '>{item?.title}</p>
          <p className='text-sm block text-green-800 font-semibold '>${parseFloat(item?.price)}</p>
        </div>
        {/*button section */}

        <div className='group flex item-center gap-2 ml-auto cursor-pointer'>
          <motion.div whileTap={{ scale: 0.75 }} onClick={() => remove('remove', item?.id)}>
            <FaTrash className=' text-green-800' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CatThings;
