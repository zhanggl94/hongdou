import React from 'react';
import BillSearch from './BillSearch/BillSearch';
import BillList from './BillList/BillList';

const Bill = () => {
    return (
        <>
            <BillSearch />
            <BillList />
        </>
    );
}

export default Bill;