import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the registration is completed successfully.
  const [successMessage, setSuccessMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */

    const name = event.target.name;
    const value = event.target.value;

    setState({ ...state, [name]: value });
    const validate = (name, value, formErrors, valid) => {
      let errors = formErrors;
      switch (name) {
        case "name":
          if (value.trim() === "") {
            errors.name = "This field is Required";
          } else if (value.length < 3) {
            errors.name = "Please Enter a Valid Name";
          } else {
            errors.name = "";
          }
          break;
        case "address":
          if (value === "") {
            errors.address = "This Field is Required";
          } else {
            errors.address = "";
          }
          break;
        case "phoneNo":
          if (value === "") {
            errors.phoneNo = "This Field is Required";
          } else if (value.length < 10 || value.length > 10) {
            errors.phoneNo = "Please Enter a Valid Phone Number";
          } else {
            errors.phoneNo = "";
          }
          break;
        case "email":
          const regex = /^[a-zA-Z0-9._%-]+@[a-z.-]+\.[a-z]{2,}$/;
          if (value === "") {
            errors.email = "This Field is Required";
          } else if (!regex.test(value)) {
            errors.email = "Please Enter a valid Email Id";
          } else {
            errors.email = "";
          }
          break;
        case "password":
          if (value === "") {
            errors.password = "This Field is Required";
          } else if (value.length <= 8 || value.length > 12) {
            errors.password = "password should be between 8 and 12 characters ";
          } else {
            errors.password = "";
          }
        default:
          break;
      }
    };
    validate(name, value, formErrors, valid);
    if (
      Object.values(formErrors).every((value) => value === "") &&
      Object.values(state).every((value) => value !== "")
    ) {
      setMandatory(true);
      setValid(true);
    } else {
      setMandatory(false);
      setValid(false);
    }
    // set the condition as The length of the name should be minimum 3 character.

    // set the condition as required field.

    // set the condition as the Phone number should have 10 digits.

    // set the condition as the Email should match the basic email format.

    // set the condition as The length of the password should be between 8 and 12 characters
  };
  const handleSubmit = async (event) => {
    // 1. This method will be invoked when user clicks on 'Register' button.
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to successMessage state:
    //    "User registered successfully with the id "+ <id>
    // 6. If the axios call is not successful, assign the error message to "Error while registering user"
    event.preventDefault();
    {
      if (mandatory) {
        try {
          const res = await axios.post("http://localhost:8080/bonstay/", state);
          console.log(res.data);
          // setSuccessMessage(
          //   `User registered successfully with the ID:${res.data.id}`
          // );
          setSuccessMessage(res.data);
          // console.log("success")
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } catch {
          setSuccessMessage("");
        }
      } else {
        setSuccessMessage("");
        console.log("error");
      }

     
    }
  };
  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5  "
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3 border-rounded">
            <div
              className="d-flex gap-3"
              style={{ backgroundColor: "#ebe7e7"}}
            >
              <div className="col-lg-6">
                <p
                  style={{
                    backgroundImage:
                 "url(https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202311271802236337-991b92628d1f11ee99820a58a9feac02.jpg)",
                    backgroundSize: "cover",
                    height: "91vh",
                    width: "100%",
                    fontFamily: "Tangerine,serif",
                    fontSize: "30px",
                    color: "white",
                    marginTop:"5%",
                    borderRadius:"3%"
                  }}
                >
                  Welcome To Bon Stay
                </p>
              </div>
              <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
                <form onSubmit={handleSubmit}>
                  {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                  <div className="mb-2 mt-2">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={state.name}
                      onChange={change}
                      style={{width:"90%"}}
                    />
                    {/* check whether name error is set,if set display the corresponding error message using conditional rendering */}
                    <div className="text-danger">
                      {formErrors.name && <span>{formErrors.name}</span>}
                    </div>
                  </div>
                  <div className="mb-2 mt-2">
                    <label className="form-label">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={state.address}
                      onChange={change}
                      style={{width:"90%"}}
                    />
                    {/* check whether address error is set,if set display the corresponding error message using conditional rendering */}
                    <div className="text-danger">
                      {formErrors.address && <span>{formErrors.address}</span>}
                    </div>
                  </div>
                  <div className="mb-2 mt-2">
                    <label className="form-label">PhoneNo:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNo"
                      value={state.phoneNo}
                      onChange={change}
                      style={{width:"90%"}}
                    />
                    <div className="text-danger">
                      {formErrors.phoneNo && <span>{formErrors.phoneNo}</span>}
                    </div>
                    {/* check whether phoneNo error is set,if set display the corresponding error message using conditional rendering */}
                  </div>
                  <div className="mb-2 mt-2">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={state.email}
                      onChange={change}
                      style={{width:"90%"}}
                    />
                    <div className="text-danger">
                      {formErrors.email && <span>{formErrors.email}</span>}
                    </div>
                    {/* check whether email error is set,if set display the corresponding error message using conditional rendering */}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={state.password}
                      onChange={change}
                      style={{width:"90%"}}
                    />
                    <div className="text-danger">
                      {formErrors.password && (
                        <span>{formErrors.password}</span>
                      )}
                    </div>{" "}
                    {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                  </div>
                  {/* bind the disabled attribute to the button to the valid state variable */}
                  <button
                    type="submit"
                    className="btn mb-2 d-block text-white"
                    style={{ backgroundColor: "#88685e" }}
                    disabled={!valid}
                  >
                    Register
                  </button>
                  <br />
                  {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                  <div className="text-success">
                    {successMessage && <div>{successMessage}</div>}
                  </div>
                  {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                  <div data-testid="mandatory" className="text-danger"></div>
                  <div
                    data-testid="successMessage"
                    className="text-danger"
                  ></div>
                  {/* create a link for Login page */}
                  <Link to={"/login"}>Login</Link>
                  with your existing account
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
