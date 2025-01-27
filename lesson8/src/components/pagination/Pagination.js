import React from 'react';
import classes from './Pagination.module.scss';


const Pagination = ({next, prev, page}) => {
    return (
        <div className={classes.wrapper}>
            <button onClick={prev}>Prev</button>
            <p>page: {page}</p>
            <button onClick={next}>Next</button>
        </div>
    );
};

export default Pagination;