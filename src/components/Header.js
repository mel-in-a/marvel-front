const Header = () => {
  return (
    <header>
      <div className="container flex flex-center flex-space-between ">
        <div className="logo ml-3"></div>
        <div className="main-menu flex gap20 flex-end mr-3">
          <div>Personnages</div>
          <div>Comics</div>
          <div>Favoris</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
