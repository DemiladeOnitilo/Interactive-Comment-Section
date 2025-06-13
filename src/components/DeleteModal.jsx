import React from "react";
import Modal from "react-modal";

const DeleteModal = ({ closeModal, isOpen, deleteComment }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        content: { position: "static", inset: "unset", margin: "auto" },
      }}
      className="bg-white w-full max-w-sm rounded-lg p-6 flex flex-col gap-4"
    >
      <h1 className="text-xl font-semibold text-[#324152]">Delete Comment</h1>
      <p className="text-[#67727e]">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="flex gap-3 w-full text-white font-semibold">
        <button onClick={closeModal} className="bg-[#324152] p-4 rounded-lg w-full max-w-1/2 cursor-pointer hover:shadow-2xl/40">NO, CANCEL</button>
        <button onClick={deleteComment} className="bg-red-400 p-4 rounded-lg w-full max-w-1/2 cursor-pointer hover:shadow-2xl/40">YES, DELETE </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
