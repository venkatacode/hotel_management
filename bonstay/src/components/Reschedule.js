import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reschedule = () => {
  const intial={
    startDate: "",
    endDate: "",
  }
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState(intial);
  const{id}=useParams();
  //state variable to capture the success Message once the rescheduling is completed successfully.
  const [Message, setMessage] = useState("");
  const[formErrors,setFormErrors]=useState({
    startDate:"",
    endDate:""
  });
  const [errorMessage,setErrorMessage]=useState()
  const[valid,setValid]=useState(false)


  const handleSubmit = async (event) => {
    // 1. This method will be invoked when user clicks on 'Book' button.
    // 2. You should prevent page reload on submit
    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/bookings/:userId" and pass the appropriate state as data to the axios call
    // 4. If the axios call is successful, assign the below string to successMessage state:
    //   "Reschedule is successfully done"
    // 5. If the axios call is not successful, assign the error message to "Something went wrong"

    event.preventDefault();
    // const bookingId={"bookingId":id}
    if(valid){
      try{
      const res= await axios.put(`http://localhost:8080/bonstay/${id}`,state)
      // setState(res)
      console.log(res.data)
      setMessage("Reschedule is successfully done")
    
      setState(intial)
    }catch{
      setErrorMessage("Some Thing Went Wrong")
      console.log("catchblock")
      setMessage("")
    }
    }else{
      // console.log(Message)
      setErrorMessage("Some Thing Went Wrong")
      setMessage("")
    }
  };
 
  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
      const name=event.target.name;
      const value=event.target.value;
      setState({...state,[name]:value})
    
      const validate=(name,value,formErrors)=>{
        let errors=formErrors
        let today=new Date()

        switch(name){
          case "startDate":
            if(value === ""){
              errors.startDate="This Field is Required"
            }else if(new Date(value) < today){
              errors.startDate="Select the date after today"
            }else{
              errors.startDate=""
            }
            break;
            case "endDate":
              if(value=== ""){
                errors.endDate="This Field is Required"
              }else if(new Date(value) <= new Date(state.startDate)){
                errors.endDate="Same Date exit is not available"
              }else{
                errors.endDate=""
              }
            default:
              break;

        }
      }
      validate(name,value,formErrors); 
  }
  useEffect(()=>{
    if(Object.values(formErrors).every(value => value === "") && Object.values(state).every(value => value !== "") ){
      setValid(true)
    }else{
      setValid(false)
    }
    console.log("valid ", valid)
}

  ,[formErrors,state])
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
                    fontSize: "2.5em",
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
                  {formErrors.startDate && <div>{formErrors.startDate}</div>}
                  </div>
                
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input type="Date" className="form-control" name="endDate" 
                  value={state.endDate} onChange={change}/>
                </div>
                <div className="text-danger">
                {formErrors.endDate && <div>{formErrors.endDate}</div>}
                </div>
               
                <br />
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e", width: "100%" }}
                  onClick={handleSubmit}
                  disabled={!valid}
                  >
                  Reschedule
                </button>
                <div className="text-success">
                {Message && <div>{Message}</div>}
                </div>
                <div className="text-danger">
                  {errorMessage && <div>{errorMessage}</div>}
                </div>
                {/*Using the concept of conditional rendering,display success message, error messages related to axios calls */}
                <div data-testid="Message" className="text-danger"></div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reschedule;
