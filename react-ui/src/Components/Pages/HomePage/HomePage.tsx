import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../../../state/authSlice";

const HomePage = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const user = auth.user;

  const handleClick = () => {
    dispatch(setCredentials({ user: null, token: null }));
  };

  return (
    <div>
      <p>Hello</p>
      <p>{user?.accountType}</p>
      <p>{user?.email}</p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default HomePage;
