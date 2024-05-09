import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllitems } from './utils/firebaseFunction';
import { actionType } from "./context/reducer";

const App = () => {
  const [{ allitems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllitems().then(data => {
      dispatch({
        type : actionType.SET_GAS_CYLINDER_TYPE,
        allitems : data
      });
    
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence wait>
      <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
       </main>
      </div>
    </AnimatePresence>
    
  );
};

export default App;

