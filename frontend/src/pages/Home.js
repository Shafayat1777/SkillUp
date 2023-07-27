import { useEffect } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import UserDetails from "../components/userDetails";
import UserForm from "../components/userForm";

const Home = () => {
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const respons = await fetch("/api/users", {
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await respons.json();

      if (respons.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user, dispatch]);

  return (
    <div className="home">
      <UserForm />
      <div className="users">{users && <UserDetails users={users} />}</div>
    </div>
  );
};

export default Home;
