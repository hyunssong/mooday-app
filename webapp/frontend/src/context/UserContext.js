import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("access_token")); //retrieve the saved token
  const [user, setUser] = useState(undefined);
  const history = useHistory();
  useEffect(() => {
    const fetchUser = async () => {
      //check if the user is valid
      try {
        const response = await axios.get(
          "https://young-hamlet-61577.herokuapp.com/api/user/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = response.data;
        setUser(data);
      } catch (error) {
         if (localStorage.getItem("refresh_token") !== null) {
           const refresh_token_data = {
             access_token: localStorage.getItem("refresh_token"),
             token_type: "Bearer",
           };
           try {
             //update the new access token information
             const token_response = await axios.post(
               "https://young-hamlet-61577.herokuapp.com/api/auth/refresh",
               refresh_token_data
             );
             localStorage.setItem(
               "access_token",
               token_response.data.access_token
             );
             setToken(token_response.data.access_token);
           } catch (error) {
             localStorage.removeItem("access_token");
             localStorage.removeItem("refresh_token");
             setToken("");
             history.push("/signup"); //not authenticated
           }
         }


      }
    };
    fetchUser();

  }, [token]);
  //passing to value so it can be accessible
  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
  //TODO: have user info as context
};
