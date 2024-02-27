import Logo from "../../../assets/NCJ-logos_transparent.svg";
import { NavLink } from "react-router-dom";


const NavBar = () => {
    return (
        <nav className="sticky top-0 z-[20] mx-auto flex w-full h-1/6 items-center justify-between shadow-md border-black" >
            <div className="flex items-center">
                <img src={Logo} className="" />
                <NavLink to="/profile"
                className="p-2 mx-4 placeholder:text-center text-lg font-semibold"
                > 
                    Jobs
                </NavLink>
                <NavLink to="/profile"
                className="p-2 mx-4 placeholder:text-center text-lg font-semibold"
                > 
                    Profile
                </NavLink>
                <NavLink to="/profile"
                className="p-2 mx-4 placeholder:text-center text-lg font-semibold"
                > 
                    Calendar
                </NavLink>
                <NavLink to="/profile"
                className="p-2 mx-4 placeholder:text-center text-lg font-semibold"
                > 
                    Inbox
                </NavLink>
                <NavLink to="/profile"
                className="p-2 mx-4 placeholder:text-center text-lg font-semibold"
                > 
                    Applications
                </NavLink>
                
            </div>
        </nav>
        
    )
}

export default NavBar

