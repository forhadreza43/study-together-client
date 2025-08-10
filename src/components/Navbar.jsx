import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useEffect, useRef, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-purple-100/70 backdrop-blur-xl shadow-md dark:bg-gray-900 w-full fixed top-0 z-999 ">
      <div className="flex items-center w-11/12 max-w-7xl mx-auto py-3 justify-between">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn btn-ghost btn-square dark:text-white"
          >
            <Menu />
          </button>
        </div>

        <div className="md:flex-start">
          <Link
            to="/"
            className="text-xl dark:text-blue-500 font-bold text-primary flex items-center-safe"
          >
            <img src="./study.svg" alt="" className="w-8 mr-2 mb-1" />
            StudyTogether
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex text-nowrap pl-5">
          <ul className="menu menu-horizontal px-1 text-gray-900 dark:text-white font-medium">
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/reviews">Reviews</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/pendingAssignments">
                    Pending Assignments
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createAssignment">Create Assignment</NavLink>
                </li>
                <li>
                  <NavLink to="/mySubmittedAssignments">My Attempt</NavLink>
                </li>
                <li>
                  <NavLink to="/faq">FAQ</NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard">Leaderboard</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-end flex gap-2">
          <div className="hidden md:block">
            <DarkModeToggle />
          </div>
          {!user ? (
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="tooltip tooltip-left"
                data-tip={user?.displayName || "User"}
              >
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="user profile" />
                  </div>
                </button>
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-52 p-2 shadow bg-base-200 rounded-box z-50 menu menu-sm">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden" ref={mobileMenuRef}>
          <ul className="absolute left-0 mt-2 w-52 p-2 shadow bg-base-200 rounded-box z-50 menu menu-sm">
            <li>
              <NavLink to="/assignments">Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/reviews">Reviews</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/pendingAssignments">
                    Pending Assignments
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/createAssignment">Create Assignment</NavLink>
                </li>
                <li>
                  <NavLink to="/mySubmittedAssignments">My Attempt</NavLink>
                </li>
                <li>
                  <NavLink to="/faq">FAQ</NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard">Leaderboard</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
