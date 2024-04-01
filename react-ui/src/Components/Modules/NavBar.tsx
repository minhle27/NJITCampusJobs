import { To, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";
import Logo from "../../assets/NCJ-logos_transparent.svg";
import ProfileImage from "../../assets/Sample-Profile.svg";
import NotificationImage from "../../assets/NotificationImage.svg";
// import { useGetEmployerQuery } from "../../services/apiSlice.ts";

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleClick = (to: To) =>
    auth.user ? navigate(to) : navigate("/login");

  //const { data: employer } = useGetEmployerQuery(auth.user!.id);

  return (
    <nav className="sticky top-0 z-[20] mx-auto flex w-full h-1/6 items-center justify-between shadow-md border-black">
      <div className="flex items-center">
        <img
          src={Logo}
          className=""
          alt="Logo"
        />
        {["/Jobs", "/Profile", "/Calendar", "/Inbox", "/Applications"].map(
          (route) => (
            <button
              key={route}
              className="customNavLink"
              onClick={() => {
                if (route === "/Jobs") {
                  return handleClick("/");
                }
                return handleClick(route.substring(1));
              }}
            >
              {route.substring(1)}
            </button>
          )
        )}
      </div>
      <div className="flex justify-end mr-6 relative">
        <div className="flex">
          <img src={NotificationImage} className="mr-4" />
          {/* <div
            role="alert"
            className="absolute top-0 right-0 z-10 bg-red-600 rounded-full p-1 text-xs mr-12"
          ></div> */}
        </div>
        <img src={ProfileImage} className="my-2" />
      </div>
    </nav>
  );
};

export default NavBar;
