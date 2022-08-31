import React from 'react';
import { CgArrowLeftO, CgArrowRightO} from 'react-icons/cg';
import '../styles/Pagination.css';



export default function Pagination({dogsPerPage, allDogs, pagination,  currentPage}) {
    const pageNumber = [];

    var totalPages = Math.ceil(allDogs / dogsPerPage); //ceil es porque el total me devuelve 21,5 

  for (let i = 0; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  function handleBack() {
    currentPage === 1 ? pagination(currentPage) : pagination(currentPage - 1);
  }

  function handleNext() {
    currentPage === pageNumber.length - 1 //el length me da una pagina de mas por ende le resto uno asi no se pasa de pagina al llegar al final
      ? pagination(currentPage)
      : pagination(currentPage + 1);
  }

  return (
    <div className="pages_ctn">
      <div className="icon_ctn">
        <CgArrowLeftO
          onClick={(e) => handleBack(e)}
          className="icon"
          size={50}
        />
      </div>

      <div className="pages_info">
        <span className="pages_num">{currentPage}</span>
        <p className="of"> of </p>
        <span className="pages_num">{totalPages}</span>
      </div>

      <div className="icon_ctn">
        <CgArrowRightO
          onClick={(e) => handleNext(e)}
          className="icon"
          size={50}
        />
      </div>
    </div>
  );
}