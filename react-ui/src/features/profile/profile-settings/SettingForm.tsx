import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import FormTextAreaField from '@/components/ui/custom/FormTextAreaField';
import FormWrapper from '@/components/ui/custom/FormWrapper';
import depts from '@/constants/departments';
import { useUser } from '@/hooks/useUser';
import { useGetEmployerQuery, useUpdateEmployerInformationMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

const settingFormSchema = z.object({
  email: formValidation.email,
  profileDescription: z.string().max(10000).min(10),
  fullName: formValidation.name,
  phone: formValidation.phone,
  department: formValidation.department,
});

const SettingForm = () => {
  const { toast } = useToast();
  const { user } = useUser();

  const [updateNewEmployerInfo, { isLoading: isLoadingUpdateNewInfo }] = useUpdateEmployerInformationMutation();
  const { data: employer } = useGetEmployerQuery(user!.id);

  const form = useForm<z.infer<typeof settingFormSchema>>({
    resolver: zodResolver(settingFormSchema),
    defaultValues: {
      email: employer?.email,
      fullName: employer?.fullName,
      phone: employer?.phone,
      department: employer?.department,
      profileDescription: employer?.profileDescription,
    },
  });

  const { reset } = form;
  const resetAsyncForm = useCallback(async () => {
    const defaultValues = {
      email: employer?.email,
      fullName: employer?.fullName,
      phone: employer?.phone,
      department: employer?.department,
      profileDescription: employer?.profileDescription,
    }

    reset(defaultValues);
  }, [employer, reset]);

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  const onSubmit = async (data: z.infer<typeof settingFormSchema>) => {
    if (!isLoadingUpdateNewInfo) {
      try {
        await updateNewEmployerInfo({ employerId: user!.id, newEmployerInformation: data }).unwrap();
        toast({
          title: 'Profile Updated!',
          description: 'You can now see profile changes in your profile page',
        });
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
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col space-y-4 w-1/3">
          <div className="mb-6 flex flex-col gap-5">
            <FormInputField form={form} type="email" label="Email" name="email" placeholder="" />
            <FormInputField form={form} type="text" label="Full Name" name="fullName" placeholder="" />
            <FormInputField form={form} type="text" label="Phone" name="phone" placeholder="" />
            <FormSelectField
              form={form}
              label="Department"
              name="department"
              placeholder="Select a department"
              options={depts}
            />
          </div>
          <Button type="submit" className="w-fit">
            Update profile
          </Button>
        </div>
        <div className="grow">
          <FormTextAreaField
            form={form}
            label="Profile Description"
            name="profileDescription"
            placeholder="Tell us about yourself"
            className="resize-none h-[calc(90vh-300px)]"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SettingForm;
