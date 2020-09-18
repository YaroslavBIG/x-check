import React, { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import firebase from 'firebase';

// TS-Interface
interface Requests {
  key: string | number;
  requestName: string;
  status: string;
  updateTime: string;
  author: string;
  maxScore: number;
}

// Network
const transformRequests = (request: any) => {
  const { id, status, updateTime, author, items, requestName } = request;
  return {
    key: id,
    requestName,
    status,
    updateTime,
    author,
    maxScore: items
      ? items.reduce((acc: any, cur: any) => {
          return acc + cur.maxScore;
        }, 0)
      : [],
  };
};

/*<Requests[]>*/

const TableRequests = () => {
  //Tasks block
  const [requests, setRequests] = useState<Requests[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    let requests: any = [];

    db.collection('requests')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          requests = [...requests, transformRequests(doc.data())];
        });
        setRequests(requests);
      });
  }, []);

  //Block of Selected row logic
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Block of search logic
  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const { searchText, searchedColumn } = search;

  const handleSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearch((prevState: { searchText: string; searchedColumn: string }) => {
      return {
        ...prevState,
        searchText: '',
      };
    });
  };

  let searchInput: any;

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // render-function for column-status
  const renderStatus = (status: string) => {
    let color;
    if (status === 'published') {
      color = 'green';
    } else if (status === 'draft') {
      color = 'orange';
    } else {
      color = 'default';
    }

    return (
      <Tag color={color} key={status}>
        {status?.toUpperCase()}
      </Tag>
    );
  };
  // collection of status for column-status
  const filtersStatus = [
    {
      text: 'Published',
      value: 'Published',
    },
    {
      text: 'Draft',
      value: 'Draft',
    },
    {
      text: 'Completed',
      value: 'Completed',
    },
  ];

  const columns = [
    {
      title: 'Request',
      dataIndex: 'requestName',
      key: 'requestName',
      ...getColumnSearchProps('requestName'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatus(status),
      filters: filtersStatus,
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Last Update',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Max Score',
      dataIndex: 'maxScore',
      key: 'maxScore',
    },
  ];

  return (
    <>
      <Table dataSource={requests} columns={columns} rowSelection={rowSelection} />
    </>
  );
};

export default TableRequests;
