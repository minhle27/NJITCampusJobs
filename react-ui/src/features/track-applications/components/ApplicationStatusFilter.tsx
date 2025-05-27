import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ApplicationStatusFilterProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ApplicationStatusFilter = ({ setStatus }: ApplicationStatusFilterProps) => {
  return (
    <div className="flex items-center">
      <Select onValueChange={(value) => setStatus(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ApplicationStatusFilter; 