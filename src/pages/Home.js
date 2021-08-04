import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=gi1Xhmu1zng67YX0"
        );
        setData(req.data.results);
        setisLoading(true);
        console.log(req.data.results[0]);
        // console.log("json data: " + req.data.results[1].name);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return isloading ? (
    <div className="loading-image">
    <img src="../loader-infinity.gif" alt="" />
  </div>
  ) : (
  
    <div className="gallery m-auto p-5">
     {data.map((character, index) => {
       
        return (
      
          <div key={index} className="card bg-orange br5">
              {character.name}
          </div>


        );
      })}
    </div>

 
  );
};

export default Home;
