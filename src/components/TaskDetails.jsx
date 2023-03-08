import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const TaskDetails = ({ task, onDelete, setIsUpdating }) => {
  return (
    <div className="">
      <div className="flex justify-between align-center pb-2 max-w-full min">
        <div className="flex max-w-full" id="special-style-overflow-wrap">
          <input value={task} type="checkbox" className="peer flex-end mr-3" />{" "}
          <h2 className="pr-2 font-bold peer-checked:line-through">
            {task.title}
          </h2>
        </div>

        <div className="flex flex-end items-center">
          <button
            onClick={() => {setIsUpdating(task._id);}}
            className="pr-1">
            <BsFillPencilFill />
          </button>
          <button
            className="pl-1"
            onClick={() => {onDelete(task._id)}}>
            <BsFillTrashFill />
          </button>
        </div>

      </div>

      <hr className="border-1 rounded border-gray-200" />

      <div id="special-style-overflow-wrap">
        <p className="my-2 pr-2">{task.description}</p>
      </div>
      
    </div>
  );
};

export default TaskDetails;
