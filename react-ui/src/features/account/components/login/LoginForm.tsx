import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAppDispatch } from '@/app/hooks';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormPasswordInputField from '@/components/ui/custom/FormPasswordInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import LoadingButton from '@/components/ui/custom/LoadingButton';
import { Form } from '@/components/ui/form';
import { useInitSocketMutation, useLoginUserMutation } from '@/services/apiSlice';
import { setCredentials } from '@/state/authSlice';
import { socket } from '@/utils/client-socket';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

import accountType from '../../../../constants/accountType';

const LoginFormSchema = z.object({
  email: formValidation.email,
  password: formValidation.password,
  accountType: formValidation.accountType,
});

export const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [initSocket] = useInitSocketMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    if (!isLoading) {
      try {
        const user = await loginUser(data).unwrap();

        dispatch(setCredentials(user));
        await initSocket(socket.id).unwrap();
        navigate('/');
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong:',
          description: getErrorMessage(e),
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormSelectField
          form={form}
          label="Type"
          placeholder="Select account type"
          name="accountType"
          options={accountType}
        />

        <FormInputField form={form} label="Email" type="email" placeholder="Email" name="email" />

        <FormPasswordInputField form={form} />

        <LoadingButton type="submit" className="w-full mb-8" isLoading={isLoading} loadingText="Please wait">
          SIGN IN
        </LoadingButton>
        <Button variant="secondary" className="w-full" onClick={() => navigate('/register')}>
          CREATE NEW ACCOUNT
        </Button>
      </form>
    </Form>
  );
};
