import { useEffect } from "react";
import { useUsersContext } from "../hooks/useUsersContext";

// components
import UserDetails from "../components/userDetails";
import UserForm from "../components/userForm";

const Home = () => {
  const { users, dispatch } = useUsersContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const respons = await fetch("/api/users");
      const json = await respons.json();

      if (respons.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="home">
      <UserForm />
      <div className="users">{users && <UserDetails users={users} />}</div>
    </div>
  );
};

export default Home;
