import type { GeneralInfoType } from './RegisterForm';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import { useAddNewUserMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

import classYear from '../../../../constants/classYear';
import degrees from '../../../../constants/degree';

const classYearOptions = classYear.map(year => year.toString());

interface RegisterStudentProps {
  generalInfo: GeneralInfoType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterStudentSchema = z.object({
  degree: z.string().min(1),
  major: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  phone: formValidation.phone,
});

const RegisterStudent = ({ generalInfo, open, setOpen }: RegisterStudentProps) => {
  const [addNewStudent, { isLoading }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterStudentSchema>>({
    resolver: zodResolver(RegisterStudentSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterStudentSchema>) => {
    const combinedRegisterInfo = {
      ...generalInfo,
      major: data.major,
      phone: data.phone,
      classYear: {
        start: data.start,
        end: data.end,
      },
      degree: data.degree,
    };

    if (!isLoading) {
      try {
        await addNewStudent(combinedRegisterInfo).unwrap();
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
                label="Degree"
                placeholder="Select your degree"
                name="degree"
                options={degrees}
              />
              <FormInputField form={form} label="Major" type="text" placeholder="Major" name="major" />
              <div className="flex flex-row space-x-3">
                <div className="w-full">
                  <FormSelectField
                    form={form}
                    label="Start"
                    options={classYearOptions}
                    placeholder="Start Year"
                    name="start"
                  />
                </div>
                <div className="w-full">
                  <FormSelectField
                    form={form}
                    label="End"
                    placeholder="End year"
                    name="end"
                    options={classYearOptions}
                  />
                </div>
              </div>
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

export default RegisterStudent;
