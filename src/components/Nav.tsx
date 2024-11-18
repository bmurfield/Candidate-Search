import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/SavedCandidates"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
