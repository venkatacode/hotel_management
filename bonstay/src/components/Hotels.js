import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hotel.css";
import { useNavigate } from "react-router-dom";
const Hotels = () => {
  const navigate = useNavigate();
  const [Hotels, sethotel] = useState([]);

  //useEffect can be used to fetch all the hotel details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8080/bonstay/hotels");
        console.log(res.data);
        sethotel(res.data);
      } catch {
        sethotel("something went wrong");
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div>
        {/* display individual hotel details in Cards and apply some inline styling */}
        {Hotels.length !==0 && Hotels.map((hotel) => {
          const { id, hotelName,city,amenities, phoneNo, address,imageUrl,review } =
            hotel;
          return (
            <div
            key={id}
              className="card d-flex justify-content-center align-items-center"
              style={{
                width: "75vw",
                height: "62vh",
                marginLeft: "15%",
                marginTop: "5%",
                // lineHeight: "0",
                backgroundColor:"#efded0",
                borderRadius:"2%"
              }}
            >
              <div key={id} className="d-flex justify-content-between gap-4">
                <div>
                  <img src={imageUrl} alt="" height="200" width="200" style={{borderRadius:"100%",boxShadow:"5px 5px 5px 5px"}} />
                </div>
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ fontSize: "20px" ,color:"#88685e",fontFamily:"Rancho"}}
                >
                  <h4>{hotelName}</h4>

                  <p>City :{city} </p>
                  <p>Amenities : {amenities}</p>
                  <p>Address :{address}</p>
                  <p>Contact No :{phoneNo}</p>
                  <p>{review}</p>
                </div>

                <div
                  className="d-flex flex-column justify-content-center w-20"
    
                >
                  <button
                    className="btn btn-success"
                    type="active"
                    style={{ backgroundColor: "#88685e" }}
                    onClick={() => navigate("/book")}
                  >
                    Book A Room
                  </button>
                  <br/>
                  {/* generate necessary code to redirect to Book page after clicking on Book A Room button */}

                  <button
                    className="btn btn-success"
                    type="active"
                    style={{ backgroundColor: "#88685e" }}
                    onClick={()=>navigate(`/addreview/${hotelName}`)}
                  >
                    Add Review
                  </button>
                  <br/>
                  {/* generate necessary code to redirect to Add review page after clicking on Add Review button */}

                  <button
                    className="btn btn-success"
                    type="active"
                    style={{ backgroundColor: "#88685e" }}
                    onClick={()=>navigate(`/viewreview/${hotelName}`)}
                  >
                    View Review
                  </button>
                  {/* generate necessary code to redirect to show review page after clicking on  View Review button */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Hotels;
