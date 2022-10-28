import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { User } from "../../DataDummy/Users";

import { useMutation } from 'react-query';
import FormAll from "../Atoms/FormAll";
import { API } from "../../config/api";
import { UserContext } from "../../Contexts/userContext";

const Login = ({
  show,
  setShow,
  setShowRegister,
  isLogin,
  setIsLogin,
  setUserRole,
}) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const [state, dispatch] = useContext(UserContext)

  // mulai dari sini:
  const [form, setForm] = useState({
    email:"",
    password:"",
  });

  // const { email, password } = form

  //
  // const name = document.getElementById("name").value
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
  
      // Data body
      const body = JSON.stringify(form);
  
      // Insert data user to database
      const response = await API.post('/login', body);

      console.log(response);

      let dataUser = response.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: dataUser,
      });

      setShow(false)

      navigate("/");
  
      // Handling response here
    } catch (error) {      
      console.log(error.response.data.message);
      alert(error.response.data.message)

    }
  };

  // const [statusMessage, setStatusMessage] = useState("");
  // function successLogin(email, password) {
  //   const emailCheck = User.filter((field) => field.email === email);

  //   if (emailCheck.length === 0) {
  //     setStatusMessage("Email belum terdaftar");
  //     return {
  //       status: false,
  //       message: statusMessage,
  //     };
  //   }

  //   const result = User.filter((field) => field.password === password);

  //   if (result.length === 0) {
  //     setStatusMessage("Password Anda Salah");
  //     return {
  //       status: false,
  //       message: statusMessage,
  //     };
  //   }
  //   setStatusMessage("Login success");
  //   return {
  //     status: true,
  //     message: statusMessage,
  //     user: result[0],
  //   };
  // }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {/* {statusMessage != "" && (
            <p className={!isLogin ? "text-danger" : "text-success"}>
              {statusMessage}
            </p>
          )} */}
          <Form onSubmit={handleSubmit}>
            <div className="text-yellow m-3">
              <h2>Login</h2>
            </div>
            <FormAll
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <FormAll
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button
            className="btn-order btn-nav px-5"
            type="submit"
          >
            Login
          </Button>
          </Form>
          
          <p className="mt-3">
            Don't have an account ? click
            <span
              className="fw-bold"
              onClick={() => {
                setShow(false);
                setShowRegister(true);
              }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
