import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useParams, Link } from "react-router-dom";
import { userContext } from "./global_context";
import axios from "axios";

import "../../styles/styles.css";
import { Context } from "../store/appContext";
// import {useNavigate} from 'react-router-dom'

export const Login = () => {
  //  useHistory is a hook that allows us to change pages
  //  and I have this bound to the onClick bellow
  let history = useNavigate();

  const navigate = useNavigate();
  // const location = useLocation();
  //________________________________________________________
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  // const history = useHistory();
  const token = sessionStorage.getItem("token");

  // console.log("This is your token", store.token)
  // console.log(store);

  const handleClick = () => {
    actions.login(userName, password);
    if (store.token && store.token !== null && store.token !== undefined) {
      setUserName("");
      setPassword("");
    }
  };

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (store.token) {
      navigate("/display_lesson/0");
    }
  });

  // useEffect(() => {
  //     if (store.token === null) {
  //       navigate("/ratings")
  //   }
  // })

  return (
    <div className="login_background">
    <div className="login">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        ></input>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <div id="submit_button">
          <button className="btn btn-primary btn-lg btn-block" onClick={handleClick} style={{width:"200px"}}>Login</button>
        </div>
        {/* <Route path="/Data" element={<Data />} /> */}
      </div>
      <Link to={"/ResetPassword"}><h6 style={{textAlign: "center", textdecoration:"underline", backgroundColor:"white"}}>forgot password?</h6></Link>

     </div> 
    </div>
  );
};
