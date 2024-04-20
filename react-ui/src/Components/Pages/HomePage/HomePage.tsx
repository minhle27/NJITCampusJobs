import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../../../state/authSlice";
import { socket } from "../../../client-socket";
import { useInitSocketMutation } from "../../../services/apiSlice";

const HomePage = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const user = auth.user;
  const [initSocketMutation] = useInitSocketMutation();

  const handleClick = () => {
    dispatch(setCredentials({ user: null, token: null }));
  };

  const initSocket = async () => {
    await initSocketMutation(socket.id).unwrap();
  };

  return (
    <div>
      <p>Hello</p>
      <p>{user?.accountType}</p>
      <p>{user?.email}</p>
      <button onClick={handleClick}>Log out</button>
      <button onClick={initSocket}>Init Socket</button>
    </div>
  );
};

export default HomePage;
