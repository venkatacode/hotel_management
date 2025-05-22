import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const{id}=useParams();
  // console.log(id);
  
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  //State to capture the error message when the call made to get all the bookings, fails.
  const [errMsg, setErrMessage] = useState("");
  // State to capture the  message when the call made to delete the given booking is successful.
  const [deleteSuccess, setDeleteSuccess] = useState("");
  

  //useEffect can be used to fetch the booking details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  //function to delete the service with given id
  useEffect(()=>{
    const fetch=async()=>{
    
      try{
        const res=await axios.get("http://localhost:8080/bonstay/bookings")
        setBookings(res.data)
        console.log(res.data);
      }catch{
        setErrMessage("SomeThing Went Wrong")
      }
    }

  fetch();
},[])
  const handleAction = async(id) => {
    // const map={"bookingId":id}
    console.log(id);
    // Delete the booking from the database by placing HTTP delete request to the
    // url - http://localhost:4000/bookings/<plan ID>
    // If the Axios call is successful, generate an alert "The booking for Booking ID :" <id > " is deleted" 
    // If the Axios call fails, generate alert "Something went wrong".
  try{
    await axios.delete(`http://localhost:8080/bonstay/${id}`)
    alert(`The booking for Booking ID :${id} is deleted`)
    setDeleteSuccess(`The booking for Booking ID :${id} is deleted`)
    const newBookings= bookings.filter(booking => booking.id !== id)
    setBookings(newBookings)
  }catch{
    setErrMessage("SomeThing Went Wrong")
  }
  
  };
  return (
    <>
      {/* display individual bookings in Cards and apply some inline styling */}
      <div className="d-flex flex-row gap-3" style={{flexWrap:"wrap"}}>
        {bookings.map((book)=>{
          const {
            id,
      startDate,
      endDate,
      noOfPersons,
      noOfRooms,
      typeOfRoom
          }=book
          return(
            <div key={id} className="card d-flex flex-column justify-content-center align-items-center" 
            style={{width:"25%",height:"60vh",backgroundColor:"#efded0",marginTop:"5%",fontSize:"0.9rem",color:"#88685e",marginLeft:"18%"}}>
        <h4>B-00{book.bookingId}</h4>
        {/* <p>Hotel Name :{book.hotels.hotelName}</p> */}
        <p>Start Date :{startDate}</p>
        <p>End Date :{endDate}</p>
        <div className="d-flex gap-3">
        <p>No of Persons :{noOfPersons}</p>
        <p>No of Rooms :{noOfRooms}</p>
        <p>Type of Rooms :{typeOfRoom}</p>
        </div>

        <button className="btn btn-secondary w-100" data-testid="Reschedule-button"
        style={{backgroundColor:"#88685e"}} onClick={()=>navigate(`/reschedule/${book.bookingId}`)}>
          Reschedule
        </button>
        {/* generate necessary code to call the function to handle reschedule opration of the user */}
        <br />
  

        <button className="btn btn-secondary w-100" data-testid="delete-button"
        style={{backgroundColor:"#88685e"}} onClick={() => handleAction(book.bookingId)}>
          Cancel 
        </button>
        
        {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message */}
      
      </div>
          )
        })}
      

      
    </div>
    </>
  );
};

export default Bookings;
