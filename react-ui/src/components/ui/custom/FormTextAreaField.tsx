import type { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea'

interface FormTextAreaFieldProps {
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
  name: string;
  className?: string;
}

const FormTextAreaField = ({ form, label, placeholder, name, className }: FormTextAreaFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className={className} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextAreaField;
