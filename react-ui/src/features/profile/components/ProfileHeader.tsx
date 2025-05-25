import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetAccountType } from '@/hooks/useGetAccounType';

const ProfileHeader = () => {
  const accountType = useGetAccountType();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-500 w-full min-h-48 flex items-center justify-center relative">
      <h1 className="text-white text-4xl font-semibold">
        {accountType === 'student' ? 'Student Profile' : 'Employer Profile'}
      </h1>

      <Avatar className="absolute bottom-[-70px] w-32 h-32 border-4 border-white rounded-full overflow-hidden">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileHeader;
