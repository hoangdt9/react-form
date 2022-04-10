import React, { useEffect } from "react";
import { useQuery } from "react-query";
import userApi from "./../api/userApi";

type Props = {
    setUserId: (val: Number) => void;
};

const User: React.FC<Props> = ({ setUserId }) => {
  const { data, isLoading, isError, error } = useQuery(
    "user",
    userApi.getUsers,
    { retry: false }
  );

  if (isLoading) {
    return <div>Loading users ...</div>;
  }

  if (isError) {
    return <div>Error !!!</div>;
  }

  return (
    <div>
      <ul>
        {data?.map((s: { id: Number; account: String }, index: React.Key) => (
          <li key={index}>
            {s.account}
            <button onClick={() => setUserId(s.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
