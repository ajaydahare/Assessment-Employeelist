import { v4 as uuidv4 } from "uuid";

const employeeData = [
  {
    id: 1,
    name: "John Deo",
    department: ["Product development", "IT services"],
    salary: 50000,
    number: "8889987656",
    email_id: "john@gmail.com",
    address: "Gachibowli,Hyderabad",
    state: "Telangana",
  },

  {
    id: 3,
    name: "Tom Cook",
    department: ["Sales","Accounts and Finance"],
    salary: 40000,
    number: "8889988899",
    email_id: "Tom@gmail.com",
    address: "Gachibowli, Hyderabad",
    state: "Telangana",
  },
  {
    id: 2,
    name: "Steven Jobs",
    department: ["Product Manager"],
    salary: 30000,
    number: "8889978699",
    email_id: "Steven@gmail.com",
    address: "HSR Layout, Bangalore",
    state: "Karnataka",
  },
  {
    id: 4,
    name: "Floyd Miles",
    department: ["Product development", "IT services", "Sales"],
    salary: 80000,
    number: "8889988899",
    email_id: "Floyd@gmail.com",
    address: "HSR Layout, Bangalore",
    state: "Karnataka",
  },
  {
    id: 5,
    name: "Ellis",
    department: ["IT services"],
    salary: 80000,
    number: "8889988899",
    email_id: "ellis@gmail.com",
    address: "HSR Layout, Bangalore",
    state: "Karnataka",
  },
  {
    id: 6,
    name: "Sue M.",
    department: ["Research and development"],
    salary: 80000,
    number: "8889988899",
    email_id: "sue@gmail.com",
    address: "HSR Layout, Bangalore",
    state: "Karnataka",
  },
];
const reducer = (employees = employeeData, action) => {
  switch (action.type) {
    case "GET_EMPLOYEES":
      return employees;
    case "ADD_EMPLOYEE":
      return [{ id: uuidv4(), ...action.payload }, ...employees];
    case "EDIT_EMPLOYEE":
      return employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    case "DELETE_EMPLOYEE":
      return employees.filter((employee) => employee.id !== action.payload);
    default:
      return employees;
  }
};

export default reducer;
