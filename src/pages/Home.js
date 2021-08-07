import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Cookies from "js-cookie";

const Home = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(100);
  const [name, setName] = useState("");
  const [actualPage, setactualPage] = useState(1);

  const numberOfPages = parseInt(count / limit);

  const [favExists, setfavExists] = useState(false);

  useEffect(() => {
    if (Cookies.get("favsChar")) {
      setfavExists(true);
    }
  }, [favExists]);

  const paginateLoop = (numberOfPages) => {
    let loop = [];
    for (let i = 1; i <= numberOfPages + 1; i++) {
      loop.push(i);
    }
    return loop;
  };

  

  const addToFavourite = (id) => {
    // i want to add an arrat to a cookie
    const favsChar = Cookies.get("favsChar");
    if (favsChar) {
      const favsArray = JSON.parse(favsChar);
      favsArray.push(id);
      Cookies.set("favsChar", JSON.stringify(favsArray));
    } else {
      const favsArray = [id];
      Cookies.set("favsChar", JSON.stringify(favsArray));
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get(
          `https://marvel-backend-melina.herokuapp.com/characters?skip=${skip}&name=${name}`
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
  }, [skip, name, actualPage]);


  // TODO oh qu'il est beau le tout doux !!!!

  const update = (page) => {
    setSkip(page * 100 - 100);
    setactualPage(page);
  };

  // const skipMinus = () => {
  //   setSkip(skip + limit);

  // }

  return isloading ? (
    <Loader />
  ) : (
    <>
      <div className="pagination flex flex-center mx-auto flex-wrap ">
        {actualPage > 1 && (
          <div
            className="left-arrow"
            onClick={() => {
              setSkip(skip - limit);
            }}
          >
            &#x1F818;
          </div>
        )}
        {/* creation d'un composant pour looper? */}
        {/* <div className="page">{numberOfPages}</div> */}

        {paginateLoop(numberOfPages).map((page, index) => {
          return (
            <div
              key={index}
              className={actualPage === page ? "page isactive" : "page"}
              onClick={(event) => {
                update(page);
              }}
            >
              {page}
            </div>
          );
        })}
        {actualPage <= numberOfPages && (
          <div
            className="right-arrow"
            onClick={() => {
              setSkip(skip + limit);
            }}
          >
            &#x1F81A;
          </div>
        )}
      </div>

      {Cookies.get("favsChar")}

      <div className="search-container m-auto mt-3">
        <input
          type="search"
          name=""
          id=""
          placeholder="Rechercher un personnage"
          className="search br5"
          onChange={(event) => setName(event.target.value)}
          autoComplete="on"
        />
      </div>


            
      {/* end top pagination bloc */}
      <div className="gallery m-auto p-5">
        {data.map((character, index) => {
          return (
            <>
              <div
                key={index}
                className="card bg-black br10 hvr-underline-reveal bold"
              >
                <div
                  className="favorite flex flex-center fs3"
                  onClick={() => addToFavourite(character._id, character.name)}
                >
                  &#x2764;
                </div>

                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt=""
                  className=""
                />

                <div className="flex flex-col flex-center gray p-2 fs-small center">
                  <div className="red"> {character.name}</div>
                  <div className=" mx-2">
                    {character.description.slice(0, 40)} ...
                  </div>
                  <Link to={`/characters/${character._id}`}>
                    <div className="btn mt-2">Voir</div>
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="pagination flex flex-center mx-auto flex-wrap ">
        {actualPage > 1 && (
          <div
            className="left-arrow"
            onClick={() => {
              setSkip(skip - limit);
            }}
          >
            &#x1F818;
          </div>
        )}
        {/* creation d'un composant pour looper? */}
        {/* <div className="page">{numberOfPages}</div> */}

        {paginateLoop(numberOfPages).map((page, index) => {
          return (
            <div
              key={index}
              className={actualPage === page ? "page isactive" : "page"}
              onClick={(event) => {
                update(page);
              }}
            >
              {page}
            </div>
          );
        })}
        {actualPage <= numberOfPages && (
          <div
            className="right-arrow"
            onClick={() => {
              setSkip(skip + limit);
            }}
          >
            &#x1F81A;
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
