import { useEffect } from "react";
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Helmet } from "react-helmet";

// components
import UserDetails from "../components/userDetails";

const Home = () => {
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const respons = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
      <div className="head">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      
      <div className="users">{users && <UserDetails users={users} />}</div>
    </div>
  );
};

export default Home;
