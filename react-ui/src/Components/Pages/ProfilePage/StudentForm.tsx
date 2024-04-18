import FormFrameModal, { ToggleHandle } from "../../Modules/FormFrameModal";

interface Props {
  studentFormRef: React.MutableRefObject<ToggleHandle | null>;
}

const StudentForm = ({ studentFormRef }: Props) => {
  return (
    <FormFrameModal
      title="Edit Profile"
      handleSubmit={(): void => {
        // Handle form submission here
      }}
      ref={studentFormRef}
      children={undefined}
    ></FormFrameModal>
  );
};

export default StudentForm;
