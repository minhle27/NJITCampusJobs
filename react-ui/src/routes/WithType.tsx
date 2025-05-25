import { useUser } from '@/hooks/useUser';

interface WithTypeProps {
  accountType: 'student' | 'employer';
  children: React.ReactNode;
}

const WithType = ({ accountType, children }: WithTypeProps) => {
  const { user } = useUser();

  if (user && user.accountType !== accountType) return null;

  return <>{children}</>;
};

export default WithType;
