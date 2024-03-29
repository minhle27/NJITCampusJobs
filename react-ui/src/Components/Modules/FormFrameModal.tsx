import { CloseOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
}

const FormFrameModal = ({ title, onClose, children } : Props) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col h-5/6 justify-center">
        <div className="bg-white p-2 rounded-3xl font-montserat">
          <div className="h-1/7 py-3 px-3">
            <div className="flex justify-end items-center">
              <button
                className="text-black text-xs place-self-end"
                onClick={onClose}
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="text-center text-2xl font-extrabold">{title}</div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default FormFrameModal;
