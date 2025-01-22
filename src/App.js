import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Users from "./components/Users/users";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import EditUser from "./components/Users/editUser";
import ParticularUser from "./components/Users/particularUser";
import MultipleUsers from "./components/Users/MultipleUser";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import Tickets from "./components/Tickets/Tickets";
import GeocodePincode from "./components/GeocodePincode/GeocodePincode";
import SendMessages from "./components/SendWhatsAppMessage/SendMessage";
// chat bot one
// import ChatBot from "react-chatbotify";

// chat bot two
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./chatBotFiles/config";
import MessageParser from "./chatBotFiles/MessageParser";
import ActionProvider from "./chatBotFiles/ActionProvider";
import PlanComparision from "./components/PlanComparision/PlanComparision";
import PlanComparisonPage from "./components/PlanComparision/PlanComparisionPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData);
  }, []);
  console.log("isLoggedIn====", isLoggedIn);

  const flow = {
    start: {
      message: "Hello world!",
    },
  };

  return (
    <div className="App">
      {/* <ChatBot flow={flow} /> */}
      
      {/* Chat bot 2 */}
      {/* <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      /> */}
      <Router>
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route
              path="/signin"
              element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="users"
              element={<ProtectedRoute element={<Users />} />}
            />
            <Route
              path="edit-user/:id"
              element={<ProtectedRoute element={<EditUser />} />}
            />
            <Route
              path="multi-user"
              element={<ProtectedRoute element={<MultipleUsers />} />}
            />
            <Route
              path="user/:id"
              element={<ProtectedRoute element={<ParticularUser />} />}
            />
            <Route
              path="tickets"
              element={<ProtectedRoute element={<Tickets />} />}
            />
            <Route
              path="geoPincode"
              element={<ProtectedRoute element={<GeocodePincode />} />}
            />
            <Route
              path="send-message"
              element={<ProtectedRoute element={<SendMessages />} />}
            />
            <Route
              path="plans"
              element={<ProtectedRoute element={<PlanComparision />} />}
            />
             <Route
              path="comparision-plan"
              element={<ProtectedRoute element={<PlanComparisonPage />} />}
            />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
