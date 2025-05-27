import type { UserProfile } from '../interface/UserProfile';

import { BackpackIcon, BellIcon, EnvelopeClosedIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useConversation } from '@/features/inbox/context/useConversation';
import { useUser } from '@/hooks/useUser';
import { useGetConversationByUserQuery, useInitConversationMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';

import BasicInfoField from './BasicInfoField';

interface InfoCardProps {
  userData: UserProfile;
}

const BasicInfoCard = ({ userData }: InfoCardProps) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [initConversation, { isLoading: isInitingConversation }] = useInitConversationMutation();
  const { data: conversations, isLoading: isConversationsLoading } = useGetConversationByUserQuery(user!.id);

  const { setActiveConversationId, setReceiverId } = useConversation();

  if (isConversationsLoading) {
    return <div>Loading...</div>;
  }

  const handleMessageClick = async () => {
    let conversationId;

    const existingConversation = conversations!.find(
      conversation => conversation.members.includes(user!.id) && conversation.members.includes(userData.id),
    );

    if (!existingConversation) {
      if (!isInitingConversation) {
        try {
          const newConversation = await initConversation({ senderId: user!.id, receiverId: userData.id }).unwrap();

          conversationId = newConversation.id;
        } catch (e) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong:',
            description: getErrorMessage(e),
          });
        }
      }
    } else {
      conversationId = existingConversation.id;
    }

    setActiveConversationId(conversationId);
    setReceiverId(userData.id);

    navigate(`/inbox/${conversationId}`);
  };

  return (
    <Card className="w-1/3 bg-white shadow-md rounded-lg h-fit">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{userData.fullName}</CardTitle>
        {userData.accountType === 'employer' && (
          <CardDescription className="text-lg">{userData.department}</CardDescription>
        )}
        {userData.accountType === 'student' && (
          <CardDescription className="text-lg">
            {userData.degree}: {userData.major}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <BasicInfoField icon={<EnvelopeClosedIcon className="w-5 h-5 text-gray-500" />} text={userData.email} />
        <BasicInfoField icon={<BellIcon className="w-5 h-5 text-gray-500" />} text={userData.phone} />
        {userData.accountType === 'student' && (
          <>
            <BasicInfoField icon={<BackpackIcon className="w-5 h-5 text-gray-500" />} text={`Class year: ${userData.classYear.start} - ${userData.classYear.end}`} />
            <BasicInfoField icon={<Pencil1Icon className="w-5 h-5 text-gray-500" />} text={`GPA: ${userData.gpa}`} />
          </>
        )}
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
        {user!.id !== userData.id && (
          <Button className="w-full" onClick={handleMessageClick}>
            Message
          </Button>
        )}
        {userData.accountType === 'employer' && (
          <Button className="w-full" variant='outline' onClick={() => navigate(`/dashboard/${userData.id}`)}>
            See available jobs
          </Button>
        )}

      </CardFooter>
    </Card>
  );
};

export default BasicInfoCard;
