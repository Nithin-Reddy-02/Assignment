import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-full z-30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <div className="mr-4">
            <Link to="/" className="cursor-pointer font-bold">
              Book Your Yoga Class
            </Link>
          </div>

          <nav className="flex flex-grow justify-end">
            <ul className="flex flex-wrap items-center">
              <li>
                <button className="cursor-pointer mr-4 btn-sm">
                  Get Batch Data
                </button>
              </li>
              <li>
                <Link to="/upcoming" className="cursor-pointer mr-4 btn-sm">
                  My Schedule
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="cursor-pointer btn-sm">
                  Book a Yoga Class
                </Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
