import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./global_context";
import { Context } from "../store/appContext";

export const User = () => {
  let navigate = useNavigate();
  const { auth, setAuth } = useContext(userContext);
  const { store, actions } = useContext(Context);

  return (
    <div className="user">
      {store.token && store.token !== null && store.token !== undefined ? (
        <h1>Welcome to the User Page</h1>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};
