import "../css/reset.css";
import "../css/common.css";
import "../css/app.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Comics = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=K5Cv4yJRhfGFYne8`
        );
        setData(req.data.comics);
        setisLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  return isloading ? (
    <Loader />
  ) : (
    <>
      <div className="container mt-3">
        {" "}
        <h1 className="red fs3">Comics</h1>
      </div>
      <div className="container red mt-4 fs3 bold">  {(data.comics === '') ? "Oooops ! pas de comics pour ce perso !"  : ''}</div>
    


      <div className="gallery m-auto p-5">
        {data.map((comic, index) => {
          return (
            <div
              key={index}
              className="card br10 bold"
            >
              <div className="card-inner">
              <div className="card-front">

              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt=""
                className=""
              />
                <div className="red mt-2"> {comic.title}</div>
              </div>
              <div className="card-back">
              <div className="flex flex-col flex-center gray p-2 fs-small center">
              
                <div className="lh4 light mt-2 text-justify">{comic.description ? comic.description : "Pas description pour le moment"}</div>
              </div>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
