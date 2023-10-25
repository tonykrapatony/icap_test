import React from 'react';

const Pagination = ({ totalItems, currentPage, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pagesToShow = 2;
    const pageNumbers = [];

    for (let i = currentPage - 2; i <= currentPage + pagesToShow; i++) {
        if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }

    const renderPageNumbers = () => {
        const pageElements = [];
        let prevPage = null;
        let nextPage = null;

        pageNumbers.forEach((pageNumber) => {
            pageElements.push(
                <button className='px-[10px] py-[5px] text-2xl border border-black cursor-pointer disabled:opacity-75'
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    disabled={pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            );
            prevPage = currentPage;
            nextPage = pageNumber;
            console.log('prevPage', prevPage)
            console.log('pageNumber', pageNumber)
            console.log('currentPage', currentPage)
        });
        if (prevPage > 1) {
            pageElements.unshift(
                <div className='px-[10px] py-[5px] text-2xl opacity-75'
                    key={'...'}
                >
                    {'...'}
                </div>
            );
        }
        console.log(pageNumbers.length)
        if (nextPage = pageNumbers.length) {
            pageElements.push(
                <div className='px-[10px] py-[5px] text-2xl opacity-75'
                    key={'....'}
                >
                    {'...'}
                </div>
            );
        }

        return pageElements;
    };

    return (
        <div className='pt-[50px] flex justify-center gap-[10px]'>
            <button className='px-[10px] py-[5px] text-2xl border border-black cursor-pointer' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
            {renderPageNumbers()}
            <button className='px-[10px] py-[5px] text-2xl border border-black cursor-pointer' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
        </div>
    );
};

export default Pagination;
