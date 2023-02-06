import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import DataTable from "../components/DataTable";

import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EmployeeForm from "../components/EmployeeForm";
const columns = [
  { heading: "ID", value: "id", isSorting: true },
  { heading: "Name", value: "name", isSorting: true },
  { heading: "Department", value: "department", isSorting: false },
  { heading: "Salary", value: "salary", isSorting: true },
  { heading: "Number", value: "number", isSorting: false },
  { heading: "Email Id", value: "email_id", isSorting: false },
  { heading: "Address", value: "address", isSorting: false },
];

function Home() {
  const [shouldShowAddModal, setShouldShowAddModal] = useState(false);
  const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employees = useSelector((store) => store);
  const [data, setData] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    currentPage: 1,
  });

  const handleSorting = (coloum) => {
    data.sort((a, b) => {
      let value1 =
        typeof a[coloum.value] === "string"
          ? a[coloum.value].toLowerCase()
          : a[coloum.value];
      let value2 =
        typeof a[coloum.value] === "string"
          ? b[coloum.value].toLowerCase()
          : b[coloum.value];

      if (value1 < value2) {
        let value = isAscending ? -1 : 1;
        setIsAscending(!isAscending);
        return value;
      }
      if (value1 > value2) {
        let value = isAscending ? 1 : -1;
        setIsAscending(!isAscending);
        return value;
      }
      return 0;
    });
    setData(data);
  };

  const handleRemove = (item) => {
    setSelectedEmployee(item);
    setShouldShowDeleteModal(true);
  };

  const handleEdit = (item) => {
    setSelectedEmployee(item);
    setShouldShowAddModal(true);
  };

  useEffect(() => {
    let currentPage = employees.length > 5 ? pagination.currentPage : 1;
    let paginatedData = employees.slice(
      pagination.pageSize * (currentPage - 1),
      pagination.pageSize * currentPage
    );
    setData(paginatedData);
  }, [pagination.currentPage, employees]);

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between mb-5 px-2">
        <h2 className="text-gray-600 text-xl font-bold">Employee Table</h2>
        <button
          className="px-6 py-1 bg-cyan-500 text-sm  font-semibold text-white rounded-md"
          onClick={() => {
            setSelectedEmployee(null);
            setShouldShowAddModal(true);
          }}
        >
          Add
        </button>
      </div>
      <DataTable
        tableData={data}
        columns={columns}
        handleSorting={handleSorting}
        actions={[
          {
            label: "Edit",
            icon: (
              <MdModeEditOutline className="w-5 h-5 text-cyan-500 cursor-pointer" />
            ),
            action: handleEdit,
          },
          {
            label: "Remove",
            icon: <MdDelete className="w-5 h-5 text-red-400 cursor-pointer" />,
            action: handleRemove,
          },
        ]}
      >
        <Pagination
          totalCount={employees.length}
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
          onPageChange={(page) => {
            setPagination({ ...pagination, currentPage: page });
          }}
        />
      </DataTable>
      <EmployeeForm
        shouldShowAddModal={shouldShowAddModal}
        onClose={() => setShouldShowAddModal(false)}
        selected={selectedEmployee}
      />
      <DeleteConfirmation
        shouldShow={shouldShowDeleteModal}
        onClose={() => setShouldShowDeleteModal(false)}
        selected={selectedEmployee}
      />
    </div>
  );
}

export default Home;
