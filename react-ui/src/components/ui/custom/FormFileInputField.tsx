import type { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputFieldProps {
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
  name: string;
}

const FormFileInputField = ({ form, label, placeholder, name }: FormInputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...fieldProps}
              placeholder={placeholder}
              type="file"
              onChange={event => onChange(event.target.files && event.target.files[0])}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFileInputField;
