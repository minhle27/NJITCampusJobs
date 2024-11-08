import { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { useUser } from '@/hooks/useUser';
import { useSendNewMessageMutation } from '@/services/apiSlice';
import getErrorMessage from '@/utils/getErrorMessage';

import { useConversation } from '../context/useConversation';


const NewMessage = () => {
  const [value, setValue] = useState('');
  const { activeConversationId } = useConversation();
  const user = useUser().user;
  const [sendNewMessage, { isLoading }] = useSendNewMessageMutation();
  const {toast} = useToast();


  const handleSubmit = async () => {
    const message = {
      sender: user!.id,
      content: value,
      conversation: activeConversationId,
    };

    if (value.length !== 0) {
      if (!isLoading) {
        try {
          await sendNewMessage(message);
          setValue('');
        } catch (e) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong:',
            description: getErrorMessage(e),
          });
        }
      }
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Message"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className=" bg-neutral-200 outline-none grow m-1 pl-2 rounded-md"
      />
      <button
        type="submit"
        className="btn-2"
        value="Send"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default NewMessage;

