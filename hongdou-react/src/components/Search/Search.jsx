import React from 'react';
import { Input, Table } from 'antd';

const Search = props => {
    const handleClick = record => {
        return {
            onClick: e => {
                props.clickData(record);
            }
        }
    }
    return (
        <div>
            <div>
                <Input />
            </div>
            <div>
                <Table onRow={handleClick} dataSource={props.dataSource} columns={props.columns} />
            </div>
        </div>
    );
};

export default Search;