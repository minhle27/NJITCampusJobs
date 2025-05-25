import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading: boolean;
  loadingText: string;
}

const LoadingButton = ({ isLoading, loadingText, children, ...rest }: LoadingButtonProps) => (
  <Button {...rest}>
    {isLoading ? (
      <>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </>
    ) : (
      children
    )}
  </Button>
);

export default LoadingButton;
