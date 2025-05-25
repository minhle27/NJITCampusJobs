import { BellIcon,EnvelopeClosedIcon } from '@radix-ui/react-icons'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';

const employerData = {
  email: 'Erin.Hills@gmail.com',
  phone: '123-456-7890',
  fullName: 'Erin Hills',
  department: 'Human Resources',
  profileDescription:
    'We are a company that values diversity and inclusion. We are looking for talented individuals to join our team.',
  profilePicture: 'https://res.cloudinary.com/ddjybuw16/image/upload/v1707930194/Test/blankProfile.png',
};

const EmployerProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{employerData.fullName}</h2>
            <p className="text-gray-600">{employerData.department}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">About Us</h3>
          <p className="text-gray-600 leading-relaxed">{employerData.profileDescription}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <EnvelopeClosedIcon className="w-5 h-5 text-gray-500" />
            <span>{employerData.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <BellIcon className="w-5 h-5 text-gray-500" />
            <span>{employerData.phone}</span>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-6">
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Contact {employerData.fullName}</Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
