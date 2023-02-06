import React, { useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const Pagination = (props) => {
  const { onPageChange, totalCount, currentPage, pageSize } = props;

  let totalPageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount]
  );

  if (totalCount <= pageSize) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex justify-between items-center px-5 py-2">
      <p className="text-sm text-gray-700 hidden sm:block ">
        Showing
        <span className="font-medium mx-1">
          {totalCount === 0 ? 0 : currentPage * pageSize - pageSize + 1}
        </span>
        to
        <span className="font-medium mx-1">
          {totalCount < currentPage * pageSize
            ? totalCount
            : currentPage * pageSize}
        </span>
        of
        <span className="font-medium mx-1">{totalCount}</span>
        results
      </p>
      <div className="flex items-center list-none">
        <button
          className="inline-flex items-center p-2  rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        {[...Array(totalPageCount).keys()].map((pageNumber) => {
          return (
            <li
              className={`px-3 py-1 sm:px-4 sm:py-2 cursor-pointer  border text-sm font-medium ${
                pageNumber + 1 === currentPage
                  ? "text-white bg-cyan-500"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </li>
          );
        })}
        <button
          className=" inline-flex items-center p-1 sm:p-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={onNext}
          disabled={currentPage === totalPageCount}
        >
          <MdKeyboardArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
