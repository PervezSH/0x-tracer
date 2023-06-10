import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="header border-bottom border-2">
      <nav className="navbar navbar-expand py-2">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              src={'/assets/logos/logo-dark.svg'}
              alt="logo"
              width={90}
              height={40}
            />
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="https://github.com/PervezSH">
                <Image
                  src={'/assets/logos/github-dark.svg'}
                  alt="github"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="https://twitter.com/per_0x">
                <Image
                  src={'/assets/logos/twitter-dark.svg'}
                  alt="twitter"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
