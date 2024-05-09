import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GiGasStove } from 'react-icons/gi';
import { MdCloudUpload } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaGasPump } from 'react-icons/fa6';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { categories } from '../utils/Data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { saveItem } from '../utils/firebaseFunction';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { getAllitems } from '../utils/firebaseFunction.js';

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [liter, setLiter] = useState('');
  const [price, setPrice] = useState('');
  const [catagory, setcatagory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const [{ allitems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_change',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg('Error while uploading : Try again 🙇‍♀️');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg('Image uploaded successfully 😊');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      },
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully 😊');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !liter || !imageAsset || !price || !catagory) {
        setFields(true);
        setMsg("Required fields can't be empty 🤦‍♀️");
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          catagory: catagory,

          liter: liter,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('data upoaded successfully 😊');
        clearData();
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading : Try again 🙇‍♀️');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setLiter('');
    setPrice('');
    setcatagory('select catagory');
  };
  const fetchData = async () => {
    await getAllitems().then((data) => {
      dispatch({
        type: actionType.SET_GAS_CYLINDER_TYPE,
        allitems: data,
      });
    });
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div
        className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col 
       items-center justify-center gap-2'
      >
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === 'danger' ? 'bg-orange-400 text-red-800' : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <GiGasStove className='text-xl text-gray-800' />
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Give me a title...'
            className='w-full h-full text-lg bg-transparent 
                outline-none border-noue placeholder:text-gray-500 text-textColor'
          />
        </div>

        <div className='w-full text-textColor'>
          <select
            onChange={(e) => setcatagory(e.target.value)}
            className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md 
             cursor-pointer'
          >
            <option value='other' className='bg-white'>
              select gas logo
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className='text-base border-0 outline-none capitalize bg-white
                text-headingColor'
                  value={item.urlparamName}
                >
                  {item.name}
                </option>
              ))}
          </select>

          <div
            className='group flex justify-center items-center flex-col border-2 
               border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'
          >
            {isLoding ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className='w-full h-full flex felx-col items-center justify-center cursor-pointer'>
                      <div className='w-full h-full flex felx-col items-center justify-center gap-2'>
                        <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                        <p className='text-gray-500 hover:text-gray-700'>click here to upload</p>
                      </div>
                      <input type='file' name='uploadimage' accept='image/*' onChange={uploadImage} className='w-0 h-0' />
                    </label>
                  </>
                ) : (
                  <>
                    <div className='relative h-full'>
                      <img src={imageAsset} alt='upload' className='w-full h-full object-cover' />
                      <button
                        type='button'
                        className='absolute bottom-3
                right- 3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-md duration-500 transition-all
                 ease-in-out'
                        onClick={deleteImage}
                      >
                        <MdDelete className='text-white' />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div
            className='w-full py-2 border-b border-gray-300 flex 
              item-center gap-2'
          >
            <FaGasPump className='text-gray-700 text-2xl' />
            <input
              type='text'
              required
              value={liter}
              onChange={(e) => setLiter(e.target.value)}
              placeholder='liters'
              className='w-full h-full text-lg bg-transparent
              outline-none border-none placeholder:text-gray-400 text-textColor'
            />
          </div>
          <div
            className='w-full py-2 border-b border-gray-300 flex 
              item-center gap-2'
          >
            <RiMoneyRupeeCircleFill className='text-gray-700 text-2xl' />
            <input
              type='text'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='price'
              className='w-full h-full text-lg bg-transparent
              outline-none border-none placeholder:text-gray-400 text-textColor'
            />
          </div>
        </div>

        <div className='flex items-center w-full'>
          <button
            type='button'
            className='ml-0 md:mi-auto w-full md:w-auto border-none 
              outline-none bg-orange-500 px-12 py-2 rounded-lg text-lg text-white font-semibold
              '
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
