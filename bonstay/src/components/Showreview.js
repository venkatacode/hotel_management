import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Home.css"
const Showreview = () => {
  const [Hotels, sethotel] = useState([]);
  const { hotelName } = useParams();
  //useEffect can be used to fetch the review details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:4000/hotels?hotelName=${hotelName}`
      );
      // console.log(res.data);
      sethotel(res.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "3%" }}
      >
        <div
          className="card  border align-items-center "
          style={{ width: "27vw", backgroundColor: "#f2d3f6" }}
        >
          {/* display all the reviews with selected hotel name in a card and apply some inline styling */}
          {Hotels.map((hotel) => {
            const { reviews, hotelName } = hotel;
            return (
              <React.Fragment key={hotel.id}>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ marginTop: "10px" }}
                >
                  <h3
                    style={{
                      fontFamily: "Tangerine,serif ",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    Customer's Reviews
                  </h3>
                  <div>{/* <p>{hotelName}</p> */}</div>
                  <div className="d-flex">
                    <div
                      style={{
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {reviews.map((review, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div
                              className="card w-100 h-50 d-flex p-1 justify-content-center align-items-center "
                              style={{
                                marginTop: "0.1rem",
                                marginBottom: "1rem",
                                // height: "6vh",
                                boxShadow: "5px 5px 5px",
                                backgroundColor: "#f7e6f9",
                                borderRadius: "10px",
                                // fontFamily: "Tangerine,serif",
                                width: '30vw'
                              }}
                            >
                              <p style={{margin: '0px'}}>{review}</p>
                            </div>
                          </React.Fragment >
                        );
                      })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Showreview;
