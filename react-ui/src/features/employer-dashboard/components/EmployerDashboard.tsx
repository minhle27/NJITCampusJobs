import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import FormDialog from '@/components/ui/custom/FormDialog';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormTextAreaField from '@/components/ui/custom/FormTextAreaField';
import FormWrapper from '@/components/ui/custom/FormWrapper';
import LoadingButton from '@/components/ui/custom/LoadingButton';
import { usePermissions } from '@/hooks/usePermissions';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

import { useCreateNewJobMutation, useGetEmployerPostsQuery } from '../../../services/apiSlice';
import JobsTable from './JobsTable';

const JobFormSchema = z.object({
  title: formValidation.jobTitle,
  externalApplication: formValidation.externalApplication,
  jobDescription: formValidation.jobDescription,
  location: formValidation.location,
  salary: formValidation.salary,
});

const EmployerDashboard = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addNewJob, { isLoading: isCreateNewJobLoading }] = useCreateNewJobMutation();
  const { isOwner } = usePermissions();

  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 10,
  });

  const { data: paginatedPosts, isLoading: isGetEmployerPostsLoading } = useGetEmployerPostsQuery({
    employerId: id!,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchQuery,
  });

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof JobFormSchema>) => {
    if (!isCreateNewJobLoading) {
      try {
        await addNewJob(data).unwrap();
        toast({
          title: 'Successful!',
          description: 'Created a new job.',
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

  if (isGetEmployerPostsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading</div>;
  }

  return (
    <div className="flex flex-col px-5 pb-5">
      <div className="p-4">
        <JobsTable
          data={paginatedPosts?.data || []}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={paginatedPosts?.totalPages || 0}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {isOwner(id!) && (
        <div className="flex justify-center">
          <FormDialog
            triggerText="Create New Jobs"
            dialogTitle="Create New Jobs"
            dialogDescription=""
            open={open}
            setOpen={setOpen}
          >
            <FormWrapper form={form} onSubmit={onSubmit}>
              <FormInputField form={form} label="Title" type="text" placeholder="Job Title" name="title" />
              <FormInputField
                form={form}
                label="External Application"
                type="text"
                placeholder="External Application"
                name="externalApplication"
              />
              <FormTextAreaField
                form={form}
                label="Job Description"
                placeholder="Job Description"
                name="jobDescription"
                className='h-32'
              />
              <FormInputField form={form} label="Location" type="text" placeholder="Location" name="location" />
              <FormInputField form={form} label="Salary" type="text" placeholder="Salary" name="salary" />
              <LoadingButton
                type="submit"
                className="w-full mb-8"
                isLoading={isGetEmployerPostsLoading}
                loadingText="Please wait"
              >
                Save
              </LoadingButton>
            </FormWrapper>
          </FormDialog>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
