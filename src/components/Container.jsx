import React, { useState, useRef } from "react";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import moment from "moment";

const Container = ({ data }) => {
  const [comments, setComments] = useState(data.comments);
  const [user] = useState(data.currentUser);
  const bottomRef = useRef(null);

  const date = moment.utc("2025-2-12").local().fromNow();

  const handleUpdate = (updatedContent, id) => {
    const updateComments = (comments) =>
      comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: updatedContent };
        }
        if (comment.replies?.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });

    setComments(updateComments(comments));
  };

  const handleSubmit = (newComment, parentId = null, replyingTo = null) => {
    const newCommentData = {
      id: Date.now(),
      content: newComment,
      createdAt: date,
      score: 0,
      user,
      replies: [],
      ...(replyingTo && { replyingTo }),
    };

    if (parentId) {
      const addReply = (comments) => {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), newCommentData], // ✅ safe spreading
      };
    }

    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReply(comment.replies),
      };
    }

    return comment;
  });
};


      setComments((prevComments) => addReply(prevComments));
    } else {
      setComments((prevComments) => [...prevComments, newCommentData]);
    }

    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };


  return (
    <div className="w-full lg:max-w-3xl lg:h-[90vh]">
      <div className="flex flex-col max-w-3xl px-6 gap-6 lg:h-[85%] mt-5 overflow-y-auto lg:mb-0 md:mb-40 mb-60">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="fixed lg:bottom-4 bottom-0 w-full lg:h-[15%] lg:mb-10">
        <CommentInput handleSubmit={handleSubmit} user={user} />
      </div>
    </div>
  );
};

export default Container;
// 