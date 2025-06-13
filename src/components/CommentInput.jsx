import React, { useState } from "react";

const CommentInput = ({ user, handleSubmit, parentId }) => {
  const [inputValue, setInputValue] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    handleSubmit(inputValue, parentId); // ✅ Send parentId
    setInputValue("");
  };

  return (
    <div>
      <div className="p-6 w-full max-w-3xl bg-white rounded-xl lg:flex md:flex hidden gap-4">
        <div className="w-[10%]">
          <img src={user.image.png} alt={user.username} />
        </div>
        <form onSubmit={onFormSubmit} className="flex gap-4 w-[90%]">
          <input
            name="newComment"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a comment..."
            className="border border-[#eaecf1] text-[#67727e] text-top rounded-lg p-2 cursor-pointer w-[85%] h-30"
          />
          <button
            type="submit"
            className="bg-[#5457b6] text-white p-2 rounded-lg cursor-pointer hover:opacity-40 transition-all ease-in-out duration-300 w-[15%] max-h-1/2"
          >
            {parentId ? "REPLY" : "SEND"}
          </button>
        </form>
      </div>
      <div className="p-6 w-full max-w-3xl bg-white rounded-xl lg:hidden md:hidden flex gap-4">
        <form onSubmit={onFormSubmit} className="flex flex-col gap-4 lg:w-[90%] md:w-[90%] w-full">
          <input
            name="newComment"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a comment..."
            className="border border-[#eaecf1] text-[#67727e] text-top rounded-lg p-2 cursor-pointer w-full h-30"
          />
          <div className="flex justify-between items-center">
            <div className="w-[15%]">
              <img src={user.image.png} alt={user.username} />
            </div>
            <button
              type="submit"
              className="bg-[#5457b6] text-white py-2 px-5 rounded-lg cursor-pointer hover:opacity-40 transition-all ease-in-out duration-300"
            >
              {parentId ? "REPLY" : "SEND"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentInput;
