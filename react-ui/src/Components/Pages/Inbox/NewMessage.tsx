import { useState } from "react";

const NewMessage = () => {
  const [value, setValue] = useState("");

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
        onClick={() => console.log("Hello")}
      >
        Send
      </button>
    </div>
  );
};

export default NewMessage;
