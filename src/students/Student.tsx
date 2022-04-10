import React, { useEffect } from "react";
import { useQuery } from "react-query";
import studentApi from "./../api/studentApi";

type Props = {
  setStudentId: (val: Number) => void;
};

const Student: React.FC<Props> = ({ setStudentId }) => {
  const { data, isLoading, isError, error } = useQuery(
    "student",
    studentApi.getStudents,
    { retry: false }
  );

  if (isLoading) {
    return <div>Loading students ...</div>;
  }

  if (isError) {
    return <div>Error !!!</div>;
  }

  return (
    <div>
      <ul>
        {data?.map((s: { id: Number; email: String }, index: React.Key) => (
          <li key={index}>
            {s.email}
            <button onClick={() => setStudentId(s.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
