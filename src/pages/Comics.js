import "../css/reset.css";
import "../css/common.css";
import "../css/app.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

//retourne les comics pour un personnage

const Comics = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(`https://marvel-backend-melina.herokuapp.com/comics/${id}`);
        setData(req.data);
        setisLoading(false);
        console.log(req.data);
        // console.log(typeof(req.data.comics));
        // window.scrollTo(0, 0);
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
      <div className="container mt-3 p-4">
        {" "}
        <h1 className="red fs3">Comics</h1>
        <img
        src={data.thumbnail.path + "." + data.thumbnail.extension}
        alt=""
        className="mx-auto card br10 flex"
      />
      </div>
      <div className="container red mt-4 fs3 bold p-4">
        {" "}
        {data.length === 0 ? "Pas de comics pour ce personnage !" : ""}
      </div>


      <div className="gallery m-auto p-5">
        {data.comics.map((comic) => {
          return (
            <>
              <div key={comic._id} className="card br10 bold">
                <div className="card-inner">
                  <div className="card-front">
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt=""
                      className=""
                    />
                    <div className="red mt-2"> {comic.title}</div>
                  </div>
                  <div className="card-back">
                    <div className="flex flex-col flex-center gray p-2 fs-small center">
                      <div className="lh4 light mt-2 text-justify">
                        {comic.description
                          ? comic.description.substring(0,455)
                          : "Pas description pour le moment"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
