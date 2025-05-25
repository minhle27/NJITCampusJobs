import { BookmarkIcon, Share2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@/components/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WithType from '@/routes/WithType';
import { useGetPostByIdQuery } from '@/services/apiSlice';
import { formatDate } from '@/utils';

import JobApplyForm from './JobApplyForm';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const { toast } = useToast();
  const [openApplyDialog, setOpenApplyDialog] = useState(false);

  const navigate = useNavigate();

  const { data: jobData, isLoading } = useGetPostByIdQuery(jobId!);

  if (isLoading || !jobData) {
    return <div>Loading</div>;
  }

  const handleShareClick = () => {
    navigator.clipboard.writeText(location.host + location.pathname + location.search + location.hash);
    toast({
      title: 'Share this job post',
      description: 'Link copied successfully',
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex gap-12">
          <Card className="drop-shadow-lg w-2/5 h-fit max-w-sm">
            <CardHeader className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src={jobData.employer.profilePicture.fileUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <h2 className="text-gray-800 text-lg">{jobData.employer.fullName}</h2>
                <p className="text-gray-500 text-sm">{jobData.employer.department}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-600 text-sm">Email: {jobData.employer.email}</p>
                <p className="text-gray-600 text-sm">Phone: {jobData.employer.phone}</p>
              </div>
              <div className="text-center mt-4">
                <Button
                  size="sm"
                  className="hover:bg-gray-700"
                  onClick={() => navigate(`/employers/${jobData.employer.id}`)}
                >
                  View Employer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="drop-shadow-lg h-fit w-full max-w-5xl">
            <CardHeader className="bg-black p-6">
              <p className="text-white text-2xl md:text-3xl mb-2">{jobData.title}</p>
              <div className="text-blue-200 flex flex-wrap items-center gap-2">
                <p>{jobData.location}</p>
                <Separator orientation="vertical" className="h-4" />
                <p>${jobData.salary}/hour</p>
                <Separator orientation="vertical" className="h-4" />
                <p>Status: {jobData.status}</p>
              </div>
              <div className="text-blue-200 text-sm flex flex-col mt-2">
                <p>Posted on: {formatDate(jobData.createdAt)}</p>
                <p>Updated on: {formatDate(jobData.updatedAt)}</p>
              </div>
            </CardHeader>
            <CardContent className="p-8 flex flex-col">
              <div className="flex">
                <div className="flex gap-3">
                  <WithType accountType="student">
                    <Button variant="outline">
                      <BookmarkIcon /> Save
                    </Button>
                  </WithType>
                  <Button variant="outline" onClick={handleShareClick}>
                    <Share2Icon /> Share
                  </Button>
                </div>
                <WithType accountType='student'>
                  {jobData.externalApplication ? (
                    <Button className="bg-gray-400 ml-auto" onClick={() => setOpenApplyDialog(true)}>
                      Apply Externally
                    </Button>
                  ) : (
                    <Button
                      className="ml-auto bg-green-500 hover:bg-green-700"
                      onClick={() => setOpenApplyDialog(true)}
                    >
                      Easy Apply
                    </Button>
                  )}
                </WithType>
              </div>
              <Separator className="my-4" />
              <section>
                <h2 className="text-gray-800 text-xl">Job Description</h2>
                <p className="text-gray-600 mt-4 leading-relaxed">{jobData.jobDescription}</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <JobApplyForm open={openApplyDialog} setOpen={setOpenApplyDialog} jobData={jobData} />
    </>
  );
};

export default JobDetailsPage;
