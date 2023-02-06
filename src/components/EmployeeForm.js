import { useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Modal from "./Modal";
import MultiSelectDropdown from "./MultiSelectDropDown";

const intialFormData = {
  name: "",
  email_id: "",
  department: [],
  salary: 0,
  number: "",
  address: "",
};

const EmployeeForm = ({ shouldShowAddModal, onClose, selected }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(intialFormData);
  const [inputError, setInputError] = useState({});
  const handleChange = useCallback((e) => {
    if (e.target.type === "number") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.valueAsNumber,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.value,
      }));
    }
    setInputError((prevInputs) => ({ ...prevInputs, [e.target.name]: "" }));
  }, []);
  const handleDeparmentChange = (item) => {
    if (inputs.department.includes(item)) {
      setInputs({
        ...inputs,
        department: inputs.department.filter((value) => value !== item),
      });
      setInputError({ ...inputError, department: "" });
    } else {
      setInputs({
        ...inputs,
        department: [...inputs.department, item],
      });
      setInputError({ ...inputError, department: "" });
    }
  };

  const formValidation = () => {
    let isValid = true;
    if (!inputs.name.trim()) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        name: "Name field is mandatory",
      }));
      isValid = false;
    }
    if (!/\S@\S+\.\S+/.test(inputs.email_id)) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        email_id: "Email field is Missing or Invalid",
      }));
      isValid = false;
    }
    if (inputs.department.length === 0) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        department: "Department field is mandatory",
      }));
      isValid = false;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(inputs.number)) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        number: "Number field is Missing or Invalid",
      }));
      isValid = false;
    }
    if (!inputs.salary) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        salary: "Salary field is mandatory",
      }));
      isValid = false;
    }
    if (!inputs.address) {
      setInputError((prevInputError) => ({
        ...prevInputError,
        salary: "Address field is mandatory",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (selected) {
        dispatch({ type: "EDIT_EMPLOYEE", payload: inputs });
      } else {
        dispatch({ type: "ADD_EMPLOYEE", payload: inputs });
      }
      onClose();
    }
  };

  useEffect(() => {
    if (selected) {
      setInputs({ ...selected });
    } else {
      setInputs(intialFormData);
    }
  }, [selected]);

  return (
    <Modal shouldShow={shouldShowAddModal} onClose={onClose}>
      <div>
        <div className="px-4 py-2 flex justify-between bg-blue-100">
          <h1 className="text-gray-700 text-xl font-semibold">
            {selected ? "Edit Employee" : "Add Employee"}
          </h1>
          <AiFillCloseCircle
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form
          className="flex flex-col gap-y-2 p-4"
          onSubmit={handleAddEmployee}
        >
          <Input
            value={inputs.name}
            type="text"
            name="name"
            label="Name"
            placeholder="Enter Name"
            required={true}
            error={inputError?.name}
            onChange={handleChange}
          />
          <Input
            value={inputs.email_id}
            name="email_id"
            type="email"
            label="Email"
            placeholder="Enter Email"
            required={true}
            onChange={handleChange}
            error={inputError?.email_id}
          />
          <MultiSelectDropdown
            label="Select department"
            required={true}
            options={[
              "IT services",
              "Product development",
              "Research and development",
              "Sales",
              "Accounts and Finance",
            ]}
            selected={inputs.department || []}
            onChange={handleDeparmentChange}
            error={inputError?.department}
          />
          <Input
            type="number"
            name="salary"
            value={inputs.salary}
            label="Salary"
            placeholder="Enter Salary"
            required={true}
            onChange={handleChange}
            error={inputError?.salary}
          />
          <Input
            type="tel"
            value={inputs.number}
            name="number"
            label="Phone Number"
            placeholder="Enter your number"
            required={true}
            onChange={handleChange}
            error={inputError?.number}
          />
          <Input
            type="text"
            value={inputs.address}
            name="address"
            label="Address"
            placeholder="Enter Address"
            required={true}
            onChange={handleChange}
            error={inputError?.address}
          />
          <button
            type="submit"
            className="my-2 px-6 py-2 bg-cyan-500 max-w-max text-sm font-semibold rounded-md text-white"
          >
            {selected ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeForm;
