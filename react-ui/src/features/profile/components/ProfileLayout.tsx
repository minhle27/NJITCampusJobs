import React from 'react';

interface ProfileProps {
  header: React.ReactNode;
  infoCard: React.ReactNode;
  descriptionCard: React.ReactNode;
  isLoading: boolean;
}

const ProfileLayout = ({ header, infoCard, descriptionCard, isLoading }: ProfileProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 h-fit min-h-screen flex flex-col items-center">
      {header}
      <div className="mt-20 px-8 w-full max-w-7xl flex flex-col lg:flex-row lg:space-x-12 space-y-6 lg:space-y-0 mb-7">
        {infoCard}
        {descriptionCard}
      </div>
    </div>
  );
};

export default ProfileLayout;