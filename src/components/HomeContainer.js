import React from 'react';
import as2 from './img/as2.jpg';
import frm3 from './img/frm3.jpg';
import indiane from './img/indiane.png';
import HPgas from './img/HPgas.jpg';
import { heroData } from '../utils/Data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id='Home'>
      <div className='py-2 flex-1 flex flex-col items-start md:items-start justify-center gap-6'>
        <div
          className='flex items-center gap-2 bg-orange-100
             px-4 py-1 rounded-full'
        >
          <p className='text-base text-orange-600 font-semibold'>Delivery</p>
          <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img src={as2} className='w-full h-full object-contain' alt='Delivery' />
          </div>
        </div>

        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor md:items-left'>
          The Cylinder Delivery in
          <span className='text-orange-600 text-[3rem] md:text-[5rem]'> Your City</span>
        </p>

        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Welcome to [Gas Agency Name], your trusted partner for all your cooking gas needs. We are committed to providing safe,reliable, and
          efficient gas delivery services to homes and businesses across [Location/City]. With years of experience in the industry, we understand the
          importance of timely gas supply for your daily cooking needs. Our team of skilled professionals ensures that your gas cylinders are
          delivered promptly and with utmost care. Whether you need a new gas connection,a refill, or assistance with any gas-related queries, we are
          here to serve you with personalized attention and top-notch service. Experience convenience and peace of mind with [Gas Agency Name].
          Contact us today to learn more about our services and how we can cater to your specific requirements."
        </p>
        <button
          type='button'
          className='bg-gradient-to-br from-orange-400
               to-orange-700 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all
                ease-in-out duration-100'
        >
          Book Now
        </button>
      </div>

      <div className='py-2 frame-round flex items-center relative'>
        <img src={frm3} className=' ml-auto h-420 w-full lg:w-full lg:h-685' alt='hero-bg' />

        <div className='w-full h-full absolute -top-9 -left-80 flex items-center justify-center px-32 py-4'>
          {/*{heroData && heroData.map(n => (
            <div key={n.id} className='w-190 p-4 bg-cardOverlay backdrop-blur-md flex flex-col item-center justify-center'>
              <img src={n.imgescr} className='w-20 -mt-20 rounded-sm ' alt='indian gas' />
              <p className='text-base font-semibold text-textColor mt-4'>{n.name}</p>
              <p className='text-md text-gray-500 font-semibold'> {n.decp}</p>
              <p className='text-sm font-semibold text-textColor'>
                <span className='text-xs text-red-500'>$</span>{n.price}
              </p>
            </div>

            ))} */}
        </div>
      </div>
    </section>
  );
};
export default HomeContainer;
