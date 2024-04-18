import EmployerProfile from "./EmployerProfile";
import StudentProfile from "./StudentProfile";
import {
  useGetEmployerQuery,
  useGetStudentQuery,
} from "../../../services/apiSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Profile = () => {
  const { id } = useParams();
  const employerQuery = useGetEmployerQuery(id || "");
  const studentQuery = useGetStudentQuery(id || "");

  if (employerQuery.isSuccess && employerQuery.data) {
    return (
      <EmployerProfile
        key={employerQuery.data.id}
        profile={employerQuery.data}
      />
    );
  } else if (studentQuery.isSuccess && studentQuery.data) {
    return (
      <StudentProfile key={studentQuery.data.id} profile={studentQuery.data} />
    );
  } else {
    return <Spinner />;
  }
};

export default Profile;
