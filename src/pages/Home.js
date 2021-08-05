import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(100);

  const numberOfPage = parseInt(count/limit);

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
    <div className="gallery m-auto p-5">
      {data.map((character, index) => {
        return (
          <div key={index} className="card bg-black br10">
            <img
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
              alt=""
            />
            <div className="flex flex-col flex-center gray p-2 fs-small center">
             <div className="red"> {character.name}</div> 
             <div className=" mx-2">{character.description.slice(0,20)} ...</div> 
            </div>
          </div>
        );
      })}
    </div>
  <div className="pagination flex flex-center mx-auto">
  
    <div className="left-arrow" onClick={() => {setSkip(skip - limit)}}>&#x1F818;</div>
     {/* map with page number */}
      {/* creation d'uncomposant pour looper!  */}
    <div className="page">1</div>

    <div className="right-arrow" onClick={() => {setSkip(skip + limit)}}>&#x1F81A;</div>
 
  </div>
</>
  );
};

export default Home;
