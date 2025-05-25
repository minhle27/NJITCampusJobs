import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileDescriptionCardProps {
  profileDescription: string;
}

const ProfileDescriptionCard = ({ profileDescription }: ProfileDescriptionCardProps) => {
  return (
    <Card className="lg:w-2/3 bg-white shadow-md rounded-lg h-fit">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">About</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed mb-4">{profileDescription}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileDescriptionCard;
