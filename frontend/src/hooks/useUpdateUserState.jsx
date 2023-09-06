import { useAuthContext } from "./useAuthContext";

export const useUpdateUsersState = () => {
  const { user } = useAuthContext();

  const updateusersstate = async (userId, status) => {
    if (user && user.token) {
      console.log(userId, status)
      const response = await fetch(
        `http://localhost:4000/api/users/user/userStatus/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
      }
    }
  };

  return { updateusersstate };
};
