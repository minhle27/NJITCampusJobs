import { useParams } from 'react-router-dom';

import { useGetStudentQuery } from '@/services/apiSlice';

import BasicInfoCard from '../components/BasicInfoCard';
import ProfileDescriptionCard from '../components/ProfileDescriptionCard';
import ProfileHeader from '../components/ProfileHeader';
import ProfileLayout from '../components/ProfileLayout';

const StudentProfile = () => {
  const { studentId } = useParams();
  const { data: studentData, isLoading } = useGetStudentQuery(studentId!);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <ProfileLayout
      header={<ProfileHeader accountType="student" />}
      infoCard={<BasicInfoCard userData={studentData!} />}
      descriptionCard={<ProfileDescriptionCard profileDescription={studentData!.profileDescription} />}
      isLoading={isLoading || !studentData}
    />
  );
};

export default StudentProfile;
