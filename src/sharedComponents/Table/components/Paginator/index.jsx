import React from 'react';

const Paginator = ({
    pageNumbers, paginate
}) => {
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination col-md-4 offset-5">
                    { pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <a id={number} onClick={() => paginate(number)} className="page-link"> { number } </a>
                        </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}

export default Paginator;
