import React from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

function DeleteConfirmation({ shouldShow, onClose, selected }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: selected.id });
    onClose();
  };
  return (
    <Modal shouldShow={shouldShow} onClose={onClose}>
      {console.log("selecte", selected)}
      <div className="p-4 flex flex-col gap-4 justify-center items-center">
        <h1>
          Are you sure you want to remove "{selected && selected.name}" employee
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleRemove}
            className="px-4 py-2 text-sm font-semibold bg-cyan-500 text-white rounded-md"
          >
            Yes
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold bg-cyan-500 text-white rounded-md"
            onClick={onClose}
          >
            no
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
