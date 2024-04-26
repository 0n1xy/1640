"use client";

import { PromptInput } from "@/app/Desktop/Student/AddNew";
import { useState } from "react";

//icon
import { PostCardTitle } from "../../MC/MC2";
import { UpdateStudent } from "@/app/Desktop/Student/Update/pages";

export default function MobileUpdatePrompt(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputValues, setInputValues] = useState({
    contributionTitle: props.promptTitle,
    faculty: props.contributionTitle,
    status: "In review"
  })

  const handleClosePost = () => {
    setIsClosePost(props.closePost);
  };
  //handle input
  const handleSubmit = (e: any) => {
    if (title != "" && description != "") {
      e.preventDefault();
      const blog = { title, description, inputValues};
      console.log(blog);
    }
  };

  return (
    <div>
      {isClosePost == false && (
        <div className="absolute bg-white overflow-x-scroll h-full">
          <PostCardTitle
            title={props.promptTitle}
            content={props.promptContent}
            event={handleClosePost}
            time={props.promptTime}
            role={props.promptRole}
          />
          <div className="">
            <form onSubmit={handleSubmit} className="max-w-[430px]">
              <PromptInput
                value={title}
                title="Title"
                isMultiline={false}
                event={(e: any) => setTitle(e.target.value)}
                defaultValue={props.postTitle}
              />
              <PromptInput
                value={description}
                title="Description"
                isMultiline={true}
                event={(e: any) => setDescription(e.target.value)}
                defaultValue={props.postContent}
              />
              <UpdateStudent postImage={props.postImage} postFile={props.postFile}/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
