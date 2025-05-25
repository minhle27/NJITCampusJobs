import type { JobPost } from '@/types';
import type { Row } from '@tanstack/react-table';

import { zodResolver } from '@hookform/resolvers/zod';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { useToast } from '@/components/hooks/use-toast';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Alert from '@/components/ui/custom/Alert';
import FormDialog from '@/components/ui/custom/FormDialog';
import FormInputField from '@/components/ui/custom/FormInputField';
import FormSelectField from '@/components/ui/custom/FormSelectField';
import FormTextAreaField from '@/components/ui/custom/FormTextAreaField';
import FormWrapper from '@/components/ui/custom/FormWrapper';
import LoadingButton from '@/components/ui/custom/LoadingButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePermissions } from '@/hooks/usePermissions';
import { useDeletePostMutation, useEditPostMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import formValidation from '@/utils/validations';

interface ActionsProps {
  row: Row<JobPost>;
}

const JobFormSchema = z.object({
  title: formValidation.jobTitle,
  externalApplication: formValidation.externalApplication,
  jobDescription: formValidation.jobDescription,
  location: formValidation.location,
  salary: formValidation.salary,
  status: formValidation.jobStatus,
});

const Actions = ({ row }: ActionsProps) => {
  const [deletePost, { isLoading: isLoadingDelete }] = useDeletePostMutation();
  const [updatePost, { isLoading: isLoadingUpdate }] = useEditPostMutation();
  const { toast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const navigate = useNavigate();
  const { isOwner } = usePermissions();
  const { id } = useParams();

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: row.original.title,
      externalApplication: row.original.externalApplication,
      jobDescription: row.original.jobDescription,
      location: row.original.location,
      salary: String(row.original.salary),
      status: row.original.status,
    },
  });

  const handleDeletePost = async () => {
    if (!isLoadingDelete) {
      try {
        await deletePost(row.original.id).unwrap();
        toast({
          title: 'Deleted Post!',
          description: 'Post has been deleted successfully',
        });
        setOpenDeleteDialog(false);
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong:',
          description: getErrorMessage(e),
        });
      }
    }
  };

  const onSubmitEdit = async (data: z.infer<typeof JobFormSchema>) => {
    if (!isLoadingUpdate) {
      try {
        await updatePost({ ...data, id: row.original.id }).unwrap();
        toast({
          title: 'Updated Post!',
          description: 'Post has been updated successfully',
        });
        setOpenEditDialog(false);
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/jobs/${row.original.id}`)}>View job details</DropdownMenuItem>
          {isOwner(id!) && (
            <>
              <DropdownMenuItem onClick={() => navigate(`/jobs/${row.original.id}/applications`)}>
                Track Applicants
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpenDeleteDialog(true);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenEditDialog(true);
                }}
              >
                Edit
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isOwner(id!) && (
        <>
          <Alert
            title={`Delete this job: ${row.getValue('title')}`}
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            description="Are you sure? You can't undo this action afterwards."
          >
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LoadingButton
              variant="destructive"
              onClick={handleDeletePost}
              isLoading={isLoadingDelete}
              loadingText="Please wait"
            >
              Delete
            </LoadingButton>
          </Alert>
          <FormDialog
            triggerText=""
            dialogTitle="Edit This Jobs"
            dialogDescription=""
            open={openEditDialog}
            setOpen={setOpenEditDialog}
          >
            <FormWrapper form={form} onSubmit={onSubmitEdit}>
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
              />
              <FormInputField form={form} label="Location" type="text" placeholder="Location" name="location" />
              <FormInputField form={form} label="Salary" type="text" placeholder="Salary" name="salary" />
              <FormSelectField
                form={form}
                label="Status"
                placeholder="Change Status"
                name="status"
                options={['open', 'close']}
              />
              <LoadingButton
                type="submit"
                className="w-full mb-8"
                isLoading={isLoadingUpdate}
                loadingText="Please wait"
              >
                Save
              </LoadingButton>
            </FormWrapper>
          </FormDialog>
        </>
      )}
    </>
  );
};

export default Actions;
