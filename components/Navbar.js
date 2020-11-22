import Link from 'next/link';

const Navbar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="#">
      <i aria-hidden className='fas fa-shopping-cart mr-2 ml-4'></i>
        Groceries List</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/"><a className="nav-link">
            <i aria-hidden className='fas fa-home mr-2 ml-4'></i>
              Home</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/about"><a className="nav-link">
            <i aria-hidden className='fas fa-info-circle mr-2'></i>
              About</a></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;