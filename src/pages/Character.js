import "../css/common.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// dans cette page je récupere les données du personnage et les comics qui lui sont liés map dans map
// je les affiche dans un tableau


const Character = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  console.log(params.id);
  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=gi1Xhmu1zng67YX0&characterId=${params.id})`
        );
        setData(req.data);
        console.log(req.data);
        setisLoading(false);

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
    <div className="container my-3">
      Mierda
    {data.map((comic, index) => {
      return (
        <div className="row" key={index}>
        {index}
        </div>
      );
       })}

    </div>


  )
};

export default Character;
