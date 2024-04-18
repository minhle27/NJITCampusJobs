import { BaseUser } from "../../../types";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

interface userProfileProps {
  profile: BaseUser;
}

const ProfileCard = ({ profile }: userProfileProps) => {
  return (
    <div className="bg-gray-100 shadow-slate-300 shadow-md border-black rounded-md p-2 h-1/2 w-auto font-montserat">
      <img
        src={profile.profilePicture.fileUrl}
        alt="Profile"
        style={{ width: "170px", height: "170px" }}
        className="rounded-full mx-auto"
      />
      <span className="block text-center mt-2 font-bold">
        {profile.fullName}
      </span>
      <div className="flex flex-col items-start ml-2">
        <h3 className="mt-2 text-left font-bold">Contact</h3>
        <span className="flex items-center text-sm mt-1">
          <MailOutlined className="mr-2 text-base font-bold" />
          {profile.email}
        </span>
        <span className="flex items-center text-sm mt-1">
          <PhoneOutlined className="mr-2 text-base font-bold" />
          {profile.phone}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
