import { CloseOutlined } from "@ant-design/icons";
import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

export type ToggleHandle = {
  toggleVisibility: () => void;
};

/**
 * This component acts as a Form frame which wraps around form fields.
 * Can be used when build pop-up form. Children is form fields
 */
const FormFrameModal = forwardRef<ToggleHandle, Props>(({ title, children, handleSubmit }: Props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  if (!visible) return null;
  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col h-5/6 justify-center">
        <div className="bg-white p-2 rounded-3xl font-montserat max-h-full flex flex-col">
          <div className="h-1/7 py-3 px-3">
            <div className="flex justify-end items-center">
              <button
                className="text-black text-xs place-self-end"
                onClick={toggleVisibility}
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="text-center text-2xl font-extrabold">{title}</div>
          </div>
          <form
            className="px-4 overflow-y-auto scrollbar-thin grow"
            onSubmit={handleSubmit}
          >
            {children}
          </form>
        </div>
      </div>
    </section>
  );
});

export default FormFrameModal;
