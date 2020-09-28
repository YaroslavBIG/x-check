import React, { useContext, useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import firebase from 'firebase';
import { RequestsContext } from '../RequestsContext/RequestsContext';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

export interface Requests {
  key: string | number;
  task: string;
  status: string;
  author: string;
  crossCheckSessionId: string;
}

interface store {
  firestore:{
    data:{
    requests:{ [key: string]: Requests }
    };
  }
}

const transformRequests = (request: any, docId: string) => {
  const {status, author, crossCheckSessionId, task } = request;
  return {
    key: docId,
    crossCheckSessionId,
    task,
    status,
    author,
  };
};

const TableRequests = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<(string | number)[]>([]);
  const { setSelectedRequests, setCurrentRequest } = useContext(RequestsContext)
  useFirestoreConnect([ { collection: 'requests' } ]);

  const allRequests = useSelector((store: store) => store.firestore.data.requests);


  useEffect(() => {
    if(selectedRowKeys.length){
      setSelectedRequests([...selectedRowKeys])
      setCurrentRequest({...allRequests[selectedRowKeys[0]]})
    } else {
      setSelectedRequests([])
      setCurrentRequest(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } }, [selectedRowKeys])



  useEffect(() => {
    const db = firebase.firestore();
    let requests: any = [];

    db.collection('requests')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          requests = [...requests, transformRequests(doc.data(), doc.id)];
        });
        setRequests(requests);
      });
  }, [allRequests]);

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};

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

  const renderStatus = (status: string) => {
    let color;
    if (status === 'PUBLISHED') {
      color = 'green';
    } else if (status === 'DRAFT') {
      color = 'orange';
    } else {
      color = 'DEFAULT';
    }

    return (
      <Tag color={color} key={status}>
        {status?.toUpperCase()}
      </Tag>
    );
  };

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
      dataIndex: 'task',
      key: 'task',
      ...getColumnSearchProps('task'),
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
      title: 'Session',
      dataIndex: 'crossCheckSessionId',
      key: 'crossCheckSessionId',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      ...getColumnSearchProps('author'),
    },
  ];

  return (
    <>
      <Table dataSource={requests} columns={columns} rowSelection={rowSelection} />
    </>
  );
};

export default TableRequests;
