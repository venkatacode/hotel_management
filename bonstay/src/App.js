import React, { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Hotels from "./components/Hotels";
import Bookings from "./components/Bookings";
import Register from "./components/Register";
import Login from "./components/Login";
import Book from './components/Book';
import Addreview from './components/Addreview';
import Showreview from './components/Showreview';
import Reschedule from "./components/Reschedule";
const App = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.setItem("authenticated", JSON.stringify(false));
    localStorage.setItem("user", JSON.stringify({}));
    navigate("/login");
    // console.log(authenticated)
  };
  const [log, setLog] = useState(
    JSON.parse(localStorage.getItem("authenticated"))
  );

  useEffect(() => {
    setLog(JSON.parse(localStorage.getItem("authenticated")));
  }, [JSON.parse(localStorage.getItem("authenticated"))]);

  return (
    <>
      <div>
        <nav
          data-testid="nav-bar"
          className="navbar navbar-expand-lg navbar-light  bg-custom"
        >
        <Link
            className="nav-link"
            style={{ fontFamily: "cursive" }}
            to="/login"
          >
            BONSTAY
          </Link>   
          <ul className="navbar-collapse nav justify-content-end">
            <li className="nav-item">
              {log && (
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              )}
            </li>

            <li className="nav-item">
              {log && (
                <Link className="nav-link" to="/hotels">
                  Hotels
                </Link>
              )}
            </li>
            <li className="nav-item">
              {log && (
                <Link className="nav-link" to="/bookings">
                  Bookings
                </Link>
              )}
            </li>
            <li className="nav-item">
              {log && (
                <a className="nav-link" onClick={handlelogout} style={{cursor:"pointer"}}>
                  Logout
                </a>
              )}
            </li>
          </ul>
        </nav>
        <Routes>
          {/*configure the Route's */}

          <Route path="/home" element={log ? <Home /> : <Login/>} />
          <Route path="/" element={log ?  <Home/> : <Login/>}/>
          <Route path="/hotels" element={log ? <Hotels /> : <Login />} />
          <Route path="/bookings" element={log ? <Bookings /> : <Login/>} />
          <Route path="/register" element={log ? <Home /> : <Register/>} />
          <Route path="/login" element={log ? <Home /> : <Login/>} />
          <Route path="/book" element={log ? <Book/> : <Login/>} />
          <Route path="/reschedule/:id" element= {log ? <Reschedule/> : <Login/>}/>
          <Route path="/addreview/:hotelName" element={log ?<Addreview/> : <Login/>} />
          <Route path="/viewreview/:hotelName" element={log ? <Showreview/> : <Login/>} />


        </Routes>
      </div>
    </>
  );
};

export default App;
