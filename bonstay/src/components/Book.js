import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// let url = "http://localhost:4000/bookings/";
const Book = () => {
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const location=useLocation()
  console.log(location);
  //  const[userId,setuserId]=useState()
  //  const[hotelId,setHotelId]=useState()

  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
    users: { userId: 1}, 
    hotels: { hotelId: 2}

  });
//   setuserId(prevState => ({
//     ...prevState,
//     userId: userId
// }));
// setHotelId(prevState => ({
//   ...prevState,
//   hotelId: hotelId
// }));
  //state to hold the individual validation errors of the form fields
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
    hotelId:"",
    userId:""
  });
  // state variable used to disable the button when any of the given form values is invalid
  const [valid, setValid] = useState(false);
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the booking is completed successfully.
  const [Message, setMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    //set the condition as the starting date should be after today's date.
    //set the condition as the End date should be greater than or equal to start date.
    // set the codition as the The number of persons should be greater than 0 and less than or equal to 5
    //set the condition as The number of rooms should be greater than 0 and less than or equal to 3
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
    const validate = (name, value, formErrors) => {
      let errors = formErrors;
      let today = new Date();
      switch (name) {
        case "startDate":
          if (value === "") {
            errors.startDate = "This Field is Required";
          } else if (new Date(value) < today) {
            errors.startDate = "Select the date after today";
          } else {
            errors.startDate = "";
          }
          break;
        case "endDate":
          if (value === "") {
            errors.endDate = "This Field is Required";
          } else if (new Date(value) <= new Date(state.startDate)) {
            errors.endDate = "Select the date after start Date";
          } else {
            errors.endDate = "";
          }
          break;
        case "noOfPersons":
          if (value === "") {
            errors.noOfPersons = "This Field is Required";
          } else if (value == 0) {
            errors.noOfPersons = "Atleast 1 Person is Required";
          } else if (value > 5) {
            errors.noOfPersons = "Only 5 Persons are allowed";
          } else {
            errors.noOfPersons = "";
          }
          break;
        case "noOfRooms":
          if (value == "") {
            errors.noOfRooms = "This Field is Required";
          } else if (value == 0) {
            errors.noOfRooms = "At least 1 Room is to be booked";
          } else if (value > 3) {
            errors.noOfRooms = "Only 3 Rooms are allowed to book";
          } else {
            errors.noOfRooms = "";
          }
          break;
        case "typeOfRoom":
          if (value == "") {
            errors.typeOfRoom = "This Field is Required";
          } else {
            errors.typeOfRoom = "";
          }
        default:
          break;
      }
    };
    validate(name, value, formErrors);
  };
  useEffect(() => {
    if (
      Object.values(formErrors).every((value) => value === "") &&
      Object.values(state).every((value) => value !== "")
    ) {
      setValid(true);
      setMandatory(true);
    } else {
      setValid(false);
      setMandatory(false);
    }
  }, [formErrors, state]);
  // const {bookingId,setBookingId }=useState('')
  const handleSubmit = async (event) => {
    // 1. This method will be invoked when user clicks on 'Book' button.
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/bookings/" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to successMessage state:
    //   "Booking is successfully created with bookingId: " + <id>
    // 6. If the axios call is not successful, assign the error message to "Something went wrong"

    event.preventDefault();
    // const id = "BOOK" + Math.floor(Math.random() * 90);

    // const book={"bookingId":bookingId};

    if (valid) {
      try {
        const newBooking = { ...state };
        const res = await axios.post("http://localhost:8080/bonstay/book",newBooking );
        // setState(res)
        // setMessage(`Booking is successfully created with bookingId: `);
        setMessage(res.data);
      } catch {
        console.log("hi");

        setMessage("Something went wrong");
      }
    } else {
      setMessage("Something went wrong");
    }
  };
  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form>
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
                    paddingTop: "30px",
                    fontSize: "3em",
                  }}
                >
                  Book a Room
                </div>

                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label">Start Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="startDate"
                    value={state.startDate}
                    onChange={change}
                  />
                  <div className="text-danger">
                    {formErrors.startDate && (
                      <span>{formErrors.startDate}</span>
                    )}
                  </div>

                  {/* Check whether the start date error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="endDate"
                    value={state.endDate}
                    onChange={change}
                    disabled={
                      state.startDate !== "" && formErrors.startDate === ""
                        ? false
                        : true
                    }
                  />
                  {/* Check whether the end date error is set, if set display the corresponding error message using conditional rendering*/}
                  <div className="text-danger">
                    {" "}
                    {formErrors.endDate && <span>{formErrors.endDate}</span>}
                  </div>
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Persons:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="noOfPersons"
                    value={state.noOfPersons}
                    onChange={change}
                  />
                  <div className="text-danger">
                    {" "}
                    {formErrors.noOfPersons && (
                      <span>{formErrors.noOfPersons}</span>
                    )}
                  </div>

                  {/* Check whether the noOfPersons error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">No Of Rooms:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="noOfRooms"
                    value={state.noOfRooms}
                    onChange={change}
                  />
                  <div className="text-danger">
                    {formErrors.noOfRooms && (
                      <span>{formErrors.noOfRooms}</span>
                    )}
                  </div>

                  {/* Check whether the noOfRooms error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                <div className="mb-2">
                  <label className="form-label">Type of Rooms:</label>
                  <select
                    name="typeOfRoom"
                    className="form-control"
                    value={state.typeOfRoom}
                    onChange={change}
                  >
                    <option name="typeOfRoom" value="">
                      --select room type--
                    </option>
                    <option name="typeOfRoom">AC</option>
                    <option name="typeOfRoom">Non AC</option>
                  </select>
                  <div className="text-danger">
                    {formErrors.typeOfRoom && (
                      <span>{formErrors.typeOfRoom}</span>
                    )}
                  </div>

                  {/* Check whether the typeOfRoom error is set, if set display the corresponding error message using conditional rendering
                   */}
                </div>
                {/* Bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  disabled={!mandatory}
                  onClick={handleSubmit}
                >
                  Book
                </button>
                {Message && <span>{Message}</span>}
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}

                <div data-testid="mandatory" className="text-danger"></div>
                <div data-testid="Message" className="text-danger"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
