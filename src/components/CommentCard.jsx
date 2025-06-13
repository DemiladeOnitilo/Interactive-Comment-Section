import React, { useState } from "react";
import data from "../data.json";
import minusIcon from "../assets/images/icon-minus.svg";
import plusIcon from "../assets/images/icon-plus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import editIcon from "../assets/images/icon-edit.svg";
import delIcon from "../assets/images/icon-delete.svg";
import DeleteModal from "./DeleteModal";
import CommentInput from "./CommentInput";

const CommentCard = ({ comment, handleSubmit, handleUpdate }) => {
  const [commentScore, setCommentScore] = useState(comment.score);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => setIsEditing(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openReply = () => setReply(true);

  const handleIncrement = () => {
    if (commentScore === comment.score) {
      setCommentScore(commentScore + 1);
    }
  };

  const handleDecrement = () => {
    if (commentScore > comment.score) {
      setCommentScore(commentScore - 1);
    }
  };

  const handleDeletion = () => {
    setDeleteComment(true);
    closeModal();
  };

  const handleUpdateClick = () => {
    handleUpdate(editedContent, comment.id);
    setIsEditing(false);
  };

  return (
    <>
      {!deleteComment && (
        <div className="bg-white rounded-xl p-6 flex lg:flex-row md:flex-row flex-col-reverse gap-4">
          <div className="flex justify-between">
            <div className="bg-[#f5f6fa] rounded-xl flex lg:flex-col md:flex-col flex-row justify-center items-center gap-4 p-4 w-auto">
              <button
                onClick={handleIncrement}
                className="cursor-pointer group w-"
              >
                <img
                  src={plusIcon}
                  alt="Plus Icon"
                  className="group-hover:brightness-50 w-full"
                />
              </button>
              <p className="text-[#5457b6] font-semibold">{commentScore}</p>
              <button
                onClick={handleDecrement}
                className="cursor-pointer group w-3"
              >
                <img
                  src={minusIcon}
                  alt="Minus Icon"
                  className="group-hover:brightness-50 w-full"
                />
              </button>
            </div>
            <div className="lg:hidden md:hidden flex items-center gap-2">
              {data.currentUser.username === comment.user.username ? (
                <div className="lg:hidden md:hidden flex gap-4">
                  <div
                    onClick={openModal}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-40 transition"
                  >
                    <img src={delIcon} alt="Delete Icon" className="h-3" />
                    <p className="text-red-500 font-semibold">Delete</p>
                  </div>
                  <DeleteModal
                    closeModal={closeModal}
                    isOpen={isOpen}
                    deleteComment={handleDeletion}
                  />
                  <div
                    onClick={handleEdit}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-40 transition"
                  >
                    <img src={editIcon} alt="Edit Icon" className="h-3" />
                    <p className="text-[#5457b6] font-semibold">Edit</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={openReply}
                  className="lg:hidden md:hidden flex items-center gap-2 cursor-pointer hover:opacity-40 transition "
                >
                  <img src={replyIcon} alt="Reply Icon" className="h-3" />
                  <p className="text-[#5457b6] font-semibold">Reply</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={comment.user.image.png}
                  alt={comment.user.username}
                  className="w-8"
                />
                <h1 className="font-semibold">{comment.user.username}</h1>
                {data.currentUser.username === comment.user.username && (
                  <span className="bg-[#5457b6] text-white text-sm font-semibold p-1">
                    you
                  </span>
                )}
                <p className="text-[#67727e]">{comment.createdAt}</p>
              </div>
              {data.currentUser.username === comment.user.username ? (
                <div className="lg:flex md:flex hidden gap-4">
                  <div
                    onClick={openModal}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-40 transition"
                  >
                    <img src={delIcon} alt="Delete Icon" className="h-3" />
                    <p className="text-red-500 font-semibold">Delete</p>
                  </div>
                  <DeleteModal
                    closeModal={closeModal}
                    isOpen={isOpen}
                    deleteComment={handleDeletion}
                  />
                  <div
                    onClick={handleEdit}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-40 transition"
                  >
                    <img src={editIcon} alt="Edit Icon" className="h-3" />
                    <p className="text-[#5457b6] font-semibold">Edit</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={openReply}
                  className="lg:flex md:flex items-center gap-2 cursor-pointer hover:opacity-40 transition hidden"
                >
                  <img src={replyIcon} alt="Reply Icon" className="h-3" />
                  <p className="text-[#5457b6] font-semibold">Reply</p>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="border border-[#eaecf1] text-[#67727e] rounded-lg p-2 w-full h-30"
                />
                <button
                  onClick={handleUpdateClick}
                  className="self-end bg-[#5457b6] text-white font-semibold px-4 py-1 rounded hover:opacity-80"
                >
                  Update
                </button>
              </div>
            ) : (
              <p className="text-[#67727e]">
                {comment.replyingTo && (
                  <span className="text-[#5457b6] font-semibold mr-1">
                    @{comment.replyingTo}
                  </span>
                )}
                {comment.content}
              </p>
            )}
          </div>
        </div>
      )}

      {!deleteComment && comment.replies && comment.replies.length > 0 && (
        <div className="lg:ml-10 lg:pl-10 md:ml-5 md:pl-5 ml-2 pl-2 flex flex-col gap-4 border-l border-[#eaecf1]">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              handleSubmit={handleSubmit}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {!deleteComment && reply && (
        <CommentInput
          handleSubmit={(newReply) => {
            handleSubmit(newReply, comment.id, comment.user.username);
            setReply(false);
          }}
          user={data.currentUser}
          parentId={comment.id}
        />
      )}
    </>
  );
};

export default CommentCard;
