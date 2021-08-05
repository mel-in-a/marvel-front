import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// dans cette page je récupere les données du personnage et les comics qui lui sont liés map dans map
// je les affiche dans un tableau


const Character = (id) => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=gi1Xhmu1zng67YX0&charactedId=${id})`
        );
        setData(req.data);
  
        setisLoading(false);

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
    <div className="container">
      container
    </div>


  )
};

export default Character;
