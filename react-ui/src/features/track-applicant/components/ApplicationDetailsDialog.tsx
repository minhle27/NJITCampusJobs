import type { Application } from '@/types';
import type { Row } from '@tanstack/react-table';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import FormDialog from '@/components/ui/custom/FormDialog';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import FormWrapper from '@/components/ui/custom/FormWrapper';
import LoadingButton from '@/components/ui/custom/LoadingButton';
import { useUpdateApplicationStatusMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

interface ApplicationDetailsDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: Row<Application>;
}

const ApplicationStatusSchema = z.object({
  status: formValidation.applicationStatus,
});

const ApplicationDetailsDialog = ({ open, setOpen, row }: ApplicationDetailsDialogProps) => {
  const { toast } = useToast();

  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateApplicationStatusMutation();

  const form = useForm<z.infer<typeof ApplicationStatusSchema>>({
    resolver: zodResolver(ApplicationStatusSchema),
    defaultValues: {
      status: row.original.status,
    },
  });

  const onSubmit = async (data: z.infer<typeof ApplicationStatusSchema>) => {
    if (!isUpdatingStatus) {
      try {
        await updateStatus({ status: data.status, applicationId: row.original.id }).unwrap();
        toast({
          title: 'Successful!',
          description: 'Application status updated.',
        });
        setOpen(false);
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
    <>
      <FormDialog triggerText="" dialogTitle="Application Details" dialogDescription="" open={open} setOpen={setOpen}>
        <div className="flex">
          <p className="font-medium mr-2 text-base">Resume:</p>
          <a href={row.original.resumeUrl} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            View applicant's resume
          </a>
        </div>
        <FormWrapper form={form} onSubmit={onSubmit}>
          <FormSelectField
            form={form}
            label="Status"
            placeholder="Change Status"
            name="status"
            options={['pending', 'accepted', 'rejected']}
          />
          <LoadingButton type="submit" className="w-full mb-8" isLoading={isUpdatingStatus} loadingText="Please wait">
            Save
          </LoadingButton>
        </FormWrapper>
      </FormDialog>
    </>
  );
};

export default ApplicationDetailsDialog;
