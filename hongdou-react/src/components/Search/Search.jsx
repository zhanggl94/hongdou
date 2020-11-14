import React from 'react';
import { Input, Table } from 'antd';

const Search = props => {
    console.log(props.columns)
    return (
        <div>
            <div>
                <Input />
            </div>
            <div>
                <Table dataSource={null} columns={props.columns} />
            </div>
        </div>
    );
}

export default Search;