import React from 'react';
import filterLogo from '../../../../assets/images/filterLogo.svg';

const SearchTable = ({
    title, wordFilter, handleOnChange, redirectCreateRegister, btnLabel, isApprover
}) => {
    return (
        <>
            <div className="row eco_filtros mb-2">
                <div className="col-md-5 eco_filter">
                    <img className="" src={filterLogo} alt="filterLogo" />
                    <div className="form-group eco_label col-md-11 m-0">
                        <label htmlFor="Correo electronico">{ title }</label>
                        <input name="word" value={wordFilter.word} onChange={handleOnChange} type="text" className="form-control" id="Pozo" maxLength="20" />
                    </div>
                </div>
                { !isApprover &&
                    <div className="col-md-2 offset-5">
                        <button onClick={redirectCreateRegister} className="btn btnPrimary">{ btnLabel }</button>
                    </div>
                }
            </div>
        </>
    )
}

export default SearchTable;
