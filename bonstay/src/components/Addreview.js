import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
const Addreview = () => {
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    Reviews: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    Reviews: "",
  });
  //state variable to capture the success Message once the review is added successfully.
  const [Message, setMessage] = useState("");
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  // state variable used to disable the button when the given form value is invalid.
  const [valid, setValid] = useState(false);
  const { id } = useParams();
  // console.log(id)
  const{hotelName}=useParams()
  const [hotels, setHotels] = useState(null);
  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter. 
       */
    //set the condition as It's a required field.

    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
    switch (name) {
      case "Reviews":
        if (value === "") {
          formErrors.Reviews = "This Field is required";
        } else {
          formErrors.Reviews = "";
        }
        break;
      default:
        break;
    }
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
  };
  useEffect(() => {
    const fetch = async() => {
      try {
        const res = await axios.get(`http://localhost:4000/hotels/?hotelName=${hotelName}`);
        setHotels(res.data[0]);
        // console.log(res.data);
        
        
      } catch {
        setMessage("Something Wrong");
      }
    };
    fetch();
  }, []);
  const handleSubmit = async (event) => {
    // 1. This method will be invoked when user clicks on 'Add Review' button.
    // 2. You should prevent page reload on submit
    // 3. check whether the form fields are entered. If the form field is not entered set the mandatory state variable to true.
    // 4.  If the form field values are entered then make axios call to
    // "http://localhost:4000/hotels/:hotelId" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to Message state:
    //   "Review is successfully added."
    // 6. If the axios call is not successful, assign the error message to "Something went wrong"
    event.preventDefault();
    if (mandatory) {
      let existingHotelReviews;
        if(hotels){
          existingHotelReviews = hotels.reviews;
          // console.log(existingHotelReviews);
      }
        try {
        // console.log([...hotels?.reviews,state.Reviews]);
        const newreviews=[...existingHotelReviews,state.Reviews];
        console.log(newreviews);
        
        await axios.patch(`http://localhost:4000/hotels/${hotels.id}`,{reviews:newreviews});
        setMessage("Review is successfully added");
      } catch {
        setMessage("Something went wrong");
      }
    } else {
      setMessage("Enter mandatory field");
    }
  };

  return (
    <>
      <div>
        <div
          className="container-fluid mt-5 p-5"
          style={{ width: "80%", fontSize: "14px" }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="col-lg-6 "> </div>
            <div
              className="d-flex align-items-center align-items-center"
              style={{
                backgroundColor: "#ebe7e7",
                width: "75%",
                borderRadius: "2%",
              }}
            >
              <form
                style={{ width: "75%", marginLeft: "10%" }}
                onSubmit={handleSubmit}
              >
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div
                  className="navbar-brand"
                  style={{
                    color: "brown",
                    textAlign: "center",
                    fontFamily: "Tangerine,serif",
                    fontWeight: "bolder",
                    paddingTop: "25px",
                    fontSize: "3em",
                  }}
                >
                  Your Reviews means a lot for us
                </div>
                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label" style={{ color: "brown" }}>
                    Add your Review:
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="Reviews"
                    rows="4"
                    cols="20"
                    maxLength="100"
                    value={state.Reviews}
                    onChange={change}
                  ></textarea>
                  {/* Check whether the reviews error is set, if set display the corresponding error message using conditional rendering
                   */}
                  <div className="text-danger">
                    {formErrors.Reviews && <div>{formErrors.Reviews}</div>}
                  </div>
                </div>
                <br />
                {/* Bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  disabled={!valid}
                >
                  Add Review
                </button>
                <br />
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                {/* <div data-testid="mandatory" className="text-danger">{Message && <div className="text-danger">{Message}</div>}</div> */}
                <div data-testid="Message" className="text">
                  {Message && <div>{Message}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addreview;
