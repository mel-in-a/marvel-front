const Paginate = (numberOfPage, actualPage, skip) => {
    return (
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
    )
}

export default Paginate;