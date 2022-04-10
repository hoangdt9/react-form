import React from "react";
import { useQuery } from "react-query";
import userApi from "./../api/userApi";

const UserDetails: React.FC<{ userId: Number }> = ({ userId }) => {
  const { data: user, isLoading } = useQuery(["user", userId], () =>
    userApi.getUser(userId)
  );

  if (!userId) return <div>Select a user</div>;

  if (isLoading) return <div>Loading userDetail</div>;

  return (
    <div>
      <h2>{user.account}</h2>
    </div>
  );
};

export default UserDetails;
