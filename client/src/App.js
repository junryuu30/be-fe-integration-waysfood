import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Component, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/style.css";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Navbars from "./Components/Navbars";
import Profile from "./Pages/Profile";
import Order from "./Pages/Order";
import EditProfile from "./Pages/EditProfile";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import AddProduct from "./Pages/Admin/AddProduct";
import ProfileAdmin from './Pages/Admin/ProfileAdmin'

import { LoginContext } from "./Contexts/LoginContext";
import { CartContext } from "./Contexts/CartContext";
import EditAdmin from "./Pages/Admin/EditAdmin";
import { UserContext } from "./Contexts/userContext";
import { API, setAuthToken } from "./config/api";
import AllNavbar from "./Components/AllNavbar";

// const PrivateRoute = () => {
//   const [state, dispatch] = useContext(UserContext)

//   return state.isLogin ? <Outlet /> : <Navigate to='/' />
// }

function App() {

  const [state, dispatch] = useContext(UserContext)
  console.log(state);

  const [dataCart, setDataCart] = useState([]);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      // console.log(response);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();




  // Call function check user with useEffect didMount here ...
  // const checkUser = async () => {
  //   try {

  //     if (localStorage.token) {
  //       setAuthToken(localStorage.token);
  //     }

  //     const response = await API.get("/check-auth");
  //     console.log(response);

  //     // Get user data
  //     let payload = response.data.data;
  //     // Get token from local storage
  //     payload.token = localStorage.token;

  //     // Send data to useContext
  //     dispatch({
  //       type: "USER_SUCCESS",
  //       payload,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  // console.log(state);

  return (
      <CartContext.Provider value={{ dataCart, setDataCart }}>
        {/* <Router> */}
          {/* <Navbars isLogin={state.isLogin} user={state.user} dispatch={dispatch} /> */}
          <QueryClientProvider client={client}>
          <AllNavbar/>
          <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<PrivateRoute/>}> */}
            <Route path="/detail" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile-admin" element={<ProfileAdmin />} />
            <Route path='/edit-admin' element={<EditAdmin />} />
          {/* </Route> */}
          </Routes>
        {/* </Router> */}
        </QueryClientProvider>
      </CartContext.Provider>
  );
}

export default App;
