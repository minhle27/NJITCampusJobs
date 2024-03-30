import Logo from "../../../assets/NCJ-logos_transparent.svg";
import ProfileImage from "../../../assets/Sample-Profile.svg";
import NotificatoinImage from "../../../assets/NotificationImage.svg";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
    return (
        <>
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
            {/* <NavLink to="/profile"
            // className="p-2 mx-4 placeholder:text-center text-lg font-semibold justify-end"
            // >
            //     <img src={ProfileImage} className="justify-end"/>
            // </NavLink> */}

            
        </>
    )
}

const NavBar = () => {
    return (
        <nav className="sticky top-0 z-[20] mx-auto flex w-full h-1/6 items-center justify-between shadow-md border-black" >
            <div className="flex items-center">
                <NavLinks/>
            </div>
            <div className="flex justify-end mr-6 relative">
                <div role="alert" className="absolute top-0 right-0 z-10 bg-red-600 rounded-full p-1 text-xs mr-12"> </div> 
                <img src={NotificatoinImage} className="mr-4"/>
                <img src={ProfileImage} className=""/>
            </div>
        </nav>
    )
}


export default NavBar

