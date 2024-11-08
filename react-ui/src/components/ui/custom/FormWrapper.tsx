import type { UseFormReturn } from 'react-hook-form';

import { Form } from '@/components/ui/form';

interface FormWrapperProps {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
}

const FormWrapper = ({ form, children, onSubmit }: FormWrapperProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </Form>
  );
};

export default FormWrapper;
