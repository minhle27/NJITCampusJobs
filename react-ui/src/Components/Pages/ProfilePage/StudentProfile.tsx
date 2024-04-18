import { ToggleHandle } from "../../Modules/FormFrameModal";
import { useRef } from "react";
import Protected from "../../Modules/Protected";
import { Student } from "../../../types";
import ProfileCard from "./profileCard";
import StudentForm from "./StudentForm";

interface StudentProfileProps {
  profile: Student;
}

const StudentProfile = ({ profile }: StudentProfileProps) => {
  const studentFormRef = useRef<ToggleHandle>(null);

  const handleEditClick = () => {
    if (studentFormRef.current) {
      studentFormRef.current.toggleVisibility();
    }
  };

  return (
    <div className="ml-10 mt-10 flex items-start font-montserat">
      <div className="flex flex-col items-center">
        <ProfileCard key={profile.id} profile={profile} />
        <Protected id={profile.id!}>
          <button
            onClick={handleEditClick}
            className="mt-4 rounded-lg bg-sky-300 border-10 py-1 px-7 font-bold"
          >
            Edit Profile
          </button>
          <StudentForm studentFormRef={studentFormRef} />
        </Protected>
      </div>
      <section className="ml-10 w-auto flex-grow-[0.8]">
        <div className="bg-gray-100 shadow-slate-300 shadow-md border-black rounded-md p-4 mb-4">
          <h1 className="font-bold">Education</h1>
          <h1>No University name</h1>
          <p>{profile.degree}</p>
          <p>
            {profile.classYear.start} - {profile.classYear.end}
          </p>
        </div>
        <div className="bg-gray-100 shadow-slate-300 shadow-md border-black rounded-md p-4 mb-4">
          <h1 className="font-bold">Resume</h1>
          {profile.resume !== null &&
            profile.resume &&
            profile.resume.length > 0 && (
              <a
                href={profile.resume[0].fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-500 hover:underline"
              >
                View last uploaded resume:{" "}
                {new Date(profile.resume[0].updatedAt).toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                  timeZoneName: "short",
                })}
              </a>
            )}
        </div>
        <div className="bg-gray-100 shadow-slate-300 shadow-md border-black rounded-md p-4 mb-4">
          <h1 className="font-bold">Transcript</h1>
          {profile.transcript && ( // Check if transcript exists
            <a
              href={profile.transcript.fileUrl} // Access transcript properties if it exists
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-500 hover:underline"
            >
              View last uploaded transcript:{" "}
              {new Date(profile.transcript.updatedAt).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
                timeZoneName: "short",
              })}
            </a>
          )}
        </div>
        <div className="bg-gray-100 shadow-slate-300 shadow-md border-black rounded-md p-4 mb-4">
          <h1 className="font-bold">About me</h1>
          <p>{profile.profileDescription}</p>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
