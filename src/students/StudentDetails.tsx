import React from "react";
import { useQuery } from "react-query";
import studentApi from "./../api/studentApi";

const StudentDetails: React.FC<{ studentId: Number }> = ({ studentId }) => {
  const { data: student, isLoading } = useQuery(["student", studentId], () =>
    studentApi.getStudent(studentId)
  );

  if (!studentId) return <div>Select a student</div>;

  if (isLoading) return <div>Loading StudentDetail</div>;

  return (
    <div>
      <h2>{student.firstName}</h2>
      <p>{student.email}</p>
    </div>
  );
};

export default StudentDetails;
