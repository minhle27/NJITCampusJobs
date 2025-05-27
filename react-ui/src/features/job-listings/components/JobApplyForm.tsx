import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import FormDialog from '@/components/ui/custom/FormDialog';
import FormFileInputField from '@/components/ui/custom/FormFileInputField';
import FormWrapper from '@/components/ui/custom/FormWrapper';
import LoadingButton from '@/components/ui/custom/LoadingButton';
import { useUser } from '@/hooks/useUser';
import { useAddNewApplicationMutation, useGetPresignedUrlQuery } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import uploadFileToCloudinary from '@/utils/uploadCloudinary';
import formValidation from '@/utils/validations';

interface JobApplyFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobData: any;
}

const JobApplyFormSchema = z.object({
  resume: formValidation.fileInput,
});

const JobApplyForm = ({ open, setOpen, jobData }: JobApplyFormProps) => {
  const { user } = useUser();

  const [addNewApplication, { isLoading: isAddingNewApplication }] = useAddNewApplicationMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof JobApplyFormSchema>>({
    resolver: zodResolver(JobApplyFormSchema),
  });

  const { data: presignedUrlData } = useGetPresignedUrlQuery({
    userId: user?.id,
    fileType: 'resume',
    accountType: 'student',
  });

  const handleSubmitApplication = async (data: z.infer<typeof JobApplyFormSchema>) => {
    const result = await uploadFileToCloudinary(data.resume, presignedUrlData);

    if (!isAddingNewApplication) {
      try {
        const applicationInfo = {
          job: jobData.id,
          resumeUrl: result.secure_url,
          student: user?.id,
          status: 'pending',
        };

        await addNewApplication({
          applicationInfo,
          jobId: jobData.id,
        });
        toast({
          title: 'Application submitted successfully!',
          description: 'You can now view your applications in the "Applications" section',
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
      <FormDialog triggerText="" dialogTitle="Apply for this job" dialogDescription="" open={open} setOpen={setOpen}>
        <FormWrapper form={form} onSubmit={handleSubmitApplication}>
          {jobData.externalApplication && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
              This job also requires an external application:
              <div>
                <a
                  href={jobData.externalApplication}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold underline hover:text-blue-700 transition-colors duration-200 ml-1"
                >
                  {jobData.externalApplication}
                </a>
              </div>
            </div>
          )}

          <FormFileInputField form={form} label="Resume" placeholder="" name="resume" />
          {/* <FormSelectField form={form} label='' placeholder='Find your resume' name='resume' options={[]}/> */}
          <LoadingButton type="submit" className="w-full mb-8" isLoading={false} loadingText="Please wait">
            Save
          </LoadingButton>
        </FormWrapper>
      </FormDialog>
    </>
  );
};

export default JobApplyForm;
