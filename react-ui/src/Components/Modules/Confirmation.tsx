import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ConfirmationProps {
  header: string;
  body: string;
  outerBtnLabel: string;
  actionBtnLable: string;
  handleAction: () => void;
}
const Confirmation = ({
  outerBtnLabel,
  actionBtnLable,
  handleAction,
  header,
  body,
}: ConfirmationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        className="btn-primary my-3 mx-1 text-white bg-black hover:bg-gray-900"
        onClick={onOpen}
      >
        {outerBtnLabel}
      </button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleAction} ml={3}>
                {actionBtnLable}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Confirmation;
