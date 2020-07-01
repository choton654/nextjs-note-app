import Link from 'next/link';

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <Link href='/'>
      <a className='navbar-brand'>Home</a>
    </Link>
    <button
      className='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#navbarSupportedContent'
      aria-controls='navbarSupportedContent'
      aria-expanded='false'
      aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon'></span>
    </button>

    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul className='navbar-nav m-auto'>
        <li className='nav-item active'></li>
        <li className='nav-item'>
          <Link href='/new'>
            <a className='nav-link'>Create</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
