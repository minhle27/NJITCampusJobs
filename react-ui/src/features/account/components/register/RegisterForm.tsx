import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormPasswordInputField from '@/components/ui/custom/FormPasswordInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import { Form } from '@/components/ui/form';
import formValidation from '@/utils/validations';

import accountType from '../../../../constants/accountType';
import RegisterEmployer from './RegisterEmployer';
import RegisterStudent from './RegisterStudent';

const GeneralInfoFormSchema = z.object({
  email: formValidation.email,
  password: formValidation.password,
  accountType: formValidation.accountType,
  fullName: formValidation.name,
});

export type GeneralInfoType = z.infer<typeof GeneralInfoFormSchema>;

export const RegisterForm = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoType | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<GeneralInfoType>({
    resolver: zodResolver(GeneralInfoFormSchema),
  });

  const onSubmit = async (data: GeneralInfoType) => {
    setGeneralInfo(data);
    setOpen(true);
  };

  return (
    <div className="w-2/3 flex flex-col space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormSelectField
            form={form}
            label="Type"
            placeholder="Select account type"
            name="accountType"
            options={accountType}
          />

          <FormInputField form={form} label="Email" type="email" placeholder="Email" name="email" />

          <FormPasswordInputField form={form} />

          <FormInputField form={form} label="Full Name" type="text" placeholder="Full Name" name="fullName" />

          <Button className="w-full" type="submit">
            CONTINUE
          </Button>
        </form>
      </Form>

      {form.watch('accountType') === 'student' ? (
        <RegisterStudent generalInfo={generalInfo!} open={open} setOpen={setOpen} />
      ) : (
        <RegisterEmployer generalInfo={generalInfo!} open={open} setOpen={setOpen} />
      )}

      <Button variant="secondary" className="w-full" onClick={() => navigate('/login')}>
        LOGIN
      </Button>
    </div>
  );
};
