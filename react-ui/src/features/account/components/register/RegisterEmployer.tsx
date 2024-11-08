import type { GeneralInfoType } from './RegisterForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useAddNewUserMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';

import depts from '../../../../constants/departments';

interface RegisterEmployerProps {
  generalInfo: GeneralInfoType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterEmployerSchema = z.object({
  department: z.string().min(1),
  phone: z.string().min(1),
});

const RegisterEmployer = ({ generalInfo, open, setOpen }: RegisterEmployerProps) => {
  const [addNewEmployer, { isLoading }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterEmployerSchema>>({
    resolver: zodResolver(RegisterEmployerSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterEmployerSchema>) => {
    const combinedRegisterInfo = {
      ...generalInfo,
      phone: data.phone,
      department: data.department,
    };

    if (!isLoading) {
      try {
        await addNewEmployer(combinedRegisterInfo).unwrap();
        toast({
          title: 'Account created successfully!',
          description: 'You can now login to your account',
        });
        setOpen(false);
        navigate('/login');
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormSelectField
                form={form}
                label="Department"
                placeholder="Select Department"
                name="department"
                options={depts}
              />
              <FormInputField form={form} label="Phone" type="text" placeholder="Phone Number" name="phone" />
              <div className="flex justify-end">
                <Button type="submit">Create Profile</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterEmployer;
