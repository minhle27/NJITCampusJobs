import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FormDialogProps {
  triggerText: string;
  dialogTitle: string;
  dialogDescription: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormDialog = ({ triggerText, dialogTitle, dialogDescription, children, open, setOpen }: FormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerText && (
        <DialogTrigger asChild>
          <Button>{triggerText}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] min-w-[500px] max-h-[700px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
