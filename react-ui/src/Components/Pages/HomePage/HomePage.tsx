import { useAuth } from "../../../hooks/useAuth";

const HomePage = () => {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div>
      <p>Hello</p>
      <p>{user?.accountType}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default HomePage;