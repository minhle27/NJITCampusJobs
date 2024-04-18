import { useRef } from "react";
import Protected from "../../Modules/Protected";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import EmployerForm from "./EmployerForm";
import JobsListHead from "./JobsListHead";
import ProfileCard from "./profileCard";
import { Employer } from "../../../types";

interface EmployerProfileProps {
  profile: Employer;
}

const EmployerProfile = ({ profile }: EmployerProfileProps) => {
  const employerFormRef = useRef<ToggleHandle>(null);

  const handleEditClick = () => {
    if (employerFormRef.current) {
      employerFormRef.current.toggleVisibility();
    }
  };

  return (
    <div className="flex items-start">
      <div className="ml-10 mt-10 flex flex-col items-center">
        <ProfileCard key={profile.id} profile={profile} />
        <Protected id={profile.id!}>
          <button
            onClick={handleEditClick}
            className="mt-4 rounded-lg bg-sky-300 border-10 py-1 px-7 font-bold"
          >
            Edit Profile
          </button>
          <EmployerForm employerFormRef={employerFormRef} />
        </Protected>
      </div>
      <div className="ml-8">
        <section>
          <h1>About Me</h1>
          <div>
            <p>{profile.profileDescription}</p>
          </div>
        </section>
        <JobsListHead employerId={profile.id!} />
      </div>
    </div>
  );
};

export default EmployerProfile;
