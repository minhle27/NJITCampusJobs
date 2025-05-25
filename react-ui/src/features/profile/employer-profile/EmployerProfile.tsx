import { useParams } from 'react-router-dom';

import { useGetEmployerQuery } from '@/services/apiSlice';

import BasicInfoCard from '../components/BasicInfoCard';
import ProfileDescriptionCard from '../components/ProfileDescriptionCard';
import ProfileHeader from '../components/ProfileHeader';
import ProfileLayout from '../components/ProfileLayout';

const EmployerProfile = () => {
  const { employerId } = useParams();
  const { data: employerData, isLoading } = useGetEmployerQuery(employerId!);

  if (isLoading) {
    return <div>Loading</div>;
  }
  
  return (
    <ProfileLayout
      header={<ProfileHeader />}
      infoCard={<BasicInfoCard userData={employerData!} />}
      descriptionCard={<ProfileDescriptionCard profileDescription={employerData!.profileDescription} />}
      isLoading={isLoading || !employerData}
    />
  );
};

export default EmployerProfile;
