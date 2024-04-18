import FormFrameModal, { ToggleHandle } from "../../Modules/FormFrameModal";

interface Props {
  employerFormRef: React.MutableRefObject<ToggleHandle | null>;
}

const EmployerForm = ({ employerFormRef }: Props) => {
  return (
    <FormFrameModal
      title="Edit Profile"
      handleSubmit={(): void => {
        // Handle form submission here
      }}
      ref={employerFormRef}
      children={undefined}
    ></FormFrameModal>
  );
};

export default EmployerForm;
