import save_logo from "../../assets/feed-save-logo.svg";
import share_logo from "../../assets/share.svg";
import { JobPost } from "../../types";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { ToggleHandle } from "./FormFrameModal";
import ApplyForm from "./ApplyForm";
import { useAuth } from "../../hooks/useAuth";

interface JobApplyProps {
  post: JobPost;
}

const JobApply = ({ post }: JobApplyProps) => {
  const toast = useToast();
  const jobFormRef = useRef<ToggleHandle>(null);
  const auth = useAuth();
  const user = auth.user;

  const handleApplyForm = () => {
    if (jobFormRef.current) {
      jobFormRef.current.toggleVisibility();
    }
  };

  const onSavedUrl = async () => {
    await navigator.clipboard.writeText(
      location.host + location.pathname + location.search + location.hash
    );
    toast({
      description: "Copied successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <section>
      <section>
        <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700 mt-auto"></hr>
        <div className="flex justify-between py-1 px-2">
          <div className="flex space-x-5">
            <div
              className="flex items-center hover:bg-search-bar p-3 cursor-pointer"
              onClick={() => console.log("saved")}
            >
              <img
                src={save_logo}
                alt="Save Icon"
                className="aspect-square w-[30px]"
              />
              <div>Save</div>
            </div>

            <div
              className="flex items-center hover:bg-search-bar p-3 cursor-pointer"
              onClick={onSavedUrl}
            >
              <img
                src={share_logo}
                alt="Share Icon"
                className="aspect-square w-[30px]"
              />
              <div>Share</div>
            </div>
          </div>
          {user?.accountType === "student" ? (
            <button
              className="bg-click-button-1 rounded-xl font-semibold px-4 my-2 hover:bg-lime-600"
              onClick={handleApplyForm}
            >
              {post.externalApplication ? "apply externally" : "1-click apply"}
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
      <ApplyForm jobFormRef={jobFormRef} post={post} />
    </section>
  );
};
export default JobApply;
