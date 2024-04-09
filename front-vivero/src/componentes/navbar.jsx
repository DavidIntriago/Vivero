import Link from 'next/link';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Vivero</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#">Explorar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../categoria">Categorias</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
  <div class="input-group">
    <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
    <div class="input-group-append">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </div>
  </div>
</form>
    </div>
  </nav>
  );
};

export default Navbar;
