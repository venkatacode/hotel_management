import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setstate] = useState({
    userid: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    userid: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to capture the success Message once the Login is completed successfully.
  const [Message, setMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    // set the condition as it's a required field.
    // set the condition as The length of the password should be between 8 and 12 characters
   
    const name = event.target.name;
    const value = event.target.value;
    setstate({ ...state, [name]: value });
    switch (name) {
      case "userid":
        if (value === "") {
          formErrors.userid = "This Field is Required";
        } else {
          formErrors.userid = "";
        }
        break;
      case "password":
        if (value === "") {
          formErrors.password = "This Field is Required";
        } else if ((value.length <= 8 || value.length > 12)) {
          formErrors.password =
            "The length of the password should be between 8 and 12 characters";
        } else {
          formErrors.password = "";
        }
        break;
      default:
        break;
    }
    if (
      Object.values(formErrors).every((value) => value === "") &&
      Object.values(state).every((value) => value !== "")
    ) {
      setValid(true);
     
    } else {
      setValid(false);
    }
  };
  const handleSubmit = async (event) => {
    // 1. This method will be invoked when user clicks on 'Login' button.
    // 2. You should prevent page reload on submit
    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 4. If the axios call is successful, assign the below string to successMessage state:
    //    "user logged in successfully."
    // 5. If the axios call is not successful, assign the error message to "Error while logging in"
    const map={
      "email":state.userid,
      "password":state.password
    }
    event.preventDefault();
    if (valid) {
      const res = await axios.post("http://localhost:8080/bonstay/login",map);
      console.log(res.data)
      // console.log(state.userid)
      // navigate("/home");
    
      // const userExist = res.data.find(
      //   (user) =>
      //     user.email === state.userid && user.password === state.password
      // );
      const userExist=res.data
      if (userExist) {
        setMessage("user Logged In Successfully,please wait Loading!!!");
        setTimeout(()=>{
          localStorage.setItem('user', JSON.stringify(userExist))
          localStorage.setItem('authenticated', JSON.stringify(true))
          navigate("/home",{email:state.userid})},2000)
      } else {
        setMessage("Invalid Credentials please try again");
      }
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div>
          <br />
          <div
            className="cards"
            style={{
              backgroundColor: "lavender",
              width: "500px",
              marginLeft: "600px",
              marginBottom: "100px",
            }}
          >
            <div className="card-body">
              <div className="row p-3">
                <div className="col-lg-6 "></div>
                <div style={{ backgroundColor: "#ebe7e7" }}>
                  <form onSubmit={handleSubmit}>
                    {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                    <h3
                      style={{
                        textAlign: "center",
                        fontFamily: "Tangerine, serif",
                        fontSize: "50px",
                        fontWeight: "bold",
                        color: "#c36211",
                      }}
                    >
                      Bonstay with us
                    </h3>
                    <div className="mb-2 mt-2">
                      <label className="form-label">UserId:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userid"
                        value={state.userid}
                        onChange={change}
                      />
                      {/* check whether userid error is set,if set display the corresponding error message using conditional rendering */}
                      <div className="text-danger">{formErrors.userid && <div>{formErrors.userid}</div>}</div>
                     
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={state.password}
                        onChange={change}
                      />
                      <div className="text-danger"> {formErrors.password && <div>{formErrors.password}</div>}</div>
                     
                      {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                    </div>
                    {/* bind the disabled attribute to the button to the valid state variable */}
                    <button
                      type="submit"
                      className="btn mb-2 d-block text-white"
                      style={{
                        backgroundColor: "#88685e",
                        paddingRight: "20px",
                        paddingLeft: "15px",
                      }}
                      disabled={!valid}
                   >
                      Login
                    </button>
                    <br />
                    {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                  <div className="">{Message && <div>{Message}</div>}</div>
                    <div data-testid="Message" className="text-danger"></div>
                    {/* create a link for Register page */}
                    <Link to="/register"> sign up</Link>
                    to create a new account
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
