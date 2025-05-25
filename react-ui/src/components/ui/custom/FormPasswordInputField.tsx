import type { UseFormReturn } from 'react-hook-form';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputFieldProps {
  form: UseFormReturn<any>;
}

const FormPasswordInputField = ({ form }: FormInputFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);


  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center"
              >
                {passwordVisible ? <EyeOpenIcon className="h-4 w-4" /> : <EyeClosedIcon className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPasswordInputField;
