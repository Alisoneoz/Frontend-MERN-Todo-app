import React from "react";

const RenderUpdateForm = ({ updateItem, taskToUpdate, handleChange}) => {
  return (
    <form onSubmit={updateItem} className="font-bold grid ">
    <label>Title</label>
    <input
      type="text"
      name="title"
      value={taskToUpdate.title}
      onChange={(e)=>handleChange(e)}
      className="my-2 w-full rounded-md drop-shadow px-3 py-1 mb-2 mt-1 text-purply-900 font-bold"
    />
    <label>Description</label>
    <input
      type="text"
      name="description"
      value={taskToUpdate.description}
      onChange={(e)=>handleChange(e)}
      className="my-2 w-full rounded-md drop-shadow px-3 py-1 mb-2 mt-1 text-purply-900 font-bold"
    />

    <button
      type="submit"
      className="drop-shadow-lg cursor-pointer px-4 py-3 mt-1 rounded-lg text-specialGray-200 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center w-full"
      
    >
      Update
    </button>
  </form>
  );
};

export default RenderUpdateForm;
