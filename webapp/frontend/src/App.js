import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NewPostPage from "./pages/NewPostPage";
import MainHeader from "./components/MainHeader";
import ViewPost from './pages/ViewPost'
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { React, useState, useContext, useEffect } from "react";
import { UserContext, UserProvider } from "./context/UserContext";
import LoginModal from "./pages/LoginModal";
import ProtectedRoute from "./components/ProtectedRoute";
import MoodPage from "./pages/MoodPage";
import "./App.css";
function App() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  
  const handleSignIn = (signInState) => {
    setOpenSignIn(signInState);
  };

  const handleSignUp = (signUpState) =>{
    setOpenSignUp(signUpState);
  }


  return (
      <div className="container">
        <UserProvider>
          <LoginModal signIn={openSignIn} onSignIn={handleSignIn} />
          <MainHeader onSignIn={handleSignIn} onSignUp={handleSignUp} />
          <main>
            <Switch>
              <ProtectedRoute path="/home" component={MainPage} />
              <Route path="/signup" component={SignupPage} />
              <ProtectedRoute path="/mood" component={MoodPage} />
              <ProtectedRoute path="/profile" component={ProfilePage} />
              <ProtectedRoute path="/new" component={NewPostPage} />
              <ProtectedRoute path="/post/:postId" component={ViewPost} />
              <ProtectedRoute path="*" component={NotFound} />
            </Switch>
          </main>
        </UserProvider>
      </div>

  );
}

export default App;
