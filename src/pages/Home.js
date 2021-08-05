import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(100);
  const numberOfPages = parseInt(count / limit);

  const paginateLoop = (numberOfPages) => {
    let loop = [];

    for (let i = 1; i <= numberOfPages; i++) {
      loop.push( i );
    }

    return loop;
  };

  // const activeClass = () => {
  //   return this.className="active";
  // };


  // count / limit = number of pages !

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=gi1Xhmu1zng67YX0&skip=${skip}`
        );
        setData(req.data.results);
        setCount(req.data.count);
        setLimit(req.data.limit);
        setisLoading(false);

        // console.log("json data: " + req.data.results[1].name);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [skip]);

  return isloading ? (
    <div className="loading-image">
      <img src="../loader-infinity.gif" alt="" />
    </div>
  ) : (
    <>
      <div className="pagination flex flex-center mx-auto">
        <div
          className="left-arrow"
          onClick={() => {
            setSkip(skip - limit);
          }}
        >
          &#x1F818;
        </div>

        {/* creation d'un composant pour looper? */}
        {/* <div className="page">{numberOfPages}</div> */}
        {paginateLoop(numberOfPages).map((page, index) => {
          return (
            <div key={index} className="page" onClick={() =>setSkip(page*100)}>
              {page}
            </div>
          );
        })}

        <div
          className="right-arrow"
          onClick={() => {
            setSkip(skip + limit);
          }}
        >
          &#x1F81A;
        </div>
      </div>

      <div className="container">Moteur de recherche ici</div>
      {/* end top pagination bloc */}
      <div className="gallery m-auto p-5">
        {data.map((character, index) => {
          return (
            <>
            <Link to={"/character/" + character._id}>
            <div key={index} className="card bg-black br10 hvr-underline-reveal bold">
              <img
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt="" className=""
              />
              <div className="flex flex-col flex-center gray p-2 fs-small center">
                <div className="red"> {character.name}</div>
                <div className=" mx-2">
                  {character.description.slice(0, 20)} ...
                </div>
              </div>
            </div>
            </Link>
</>
          );
        })}
      </div>
      <div className="pagination flex flex-center mx-auto">
        <div
          className="left-arrow"
          onClick={() => {
            setSkip(skip - limit);
          }}
        >
          &#x1F818;
        </div>

        {/* creation d'un composant pour looper? */}
        {/* <div className="page">{numberOfPages}</div> */}
       {/* TODO // avoid click when no mores pages */}
        {paginateLoop(numberOfPages).map((page, index) => {
          return (
            <div key={index} className="page" onClick={() =>setSkip(page*100)}>
              {page}
            </div>
          );
        })}

        <div
          className="right-arrow"
          onClick={() => {
            setSkip(skip + limit);
          }}
        >
          &#x1F81A;
        </div>
      </div>
    </>
  );
};

export default Home;
