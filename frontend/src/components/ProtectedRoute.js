import  {useContext} from 'react';
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { token, setToken, user, setUser } = useContext(UserContext);
  console.log("this", token);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token!=null ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
}
export default ProtectedRoute;