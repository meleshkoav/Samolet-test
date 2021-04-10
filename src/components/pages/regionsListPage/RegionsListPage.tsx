import { Collapse, Input, Table, Button, Space } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IDataItem } from 'types';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import _ from 'lodash';

const { Panel } = Collapse;

export type TRegionsListPageDataItem = {
  regionName: string,
  count: number,
  libs: IDataItem[]
}
export type TRegionsListPageData = TRegionsListPageDataItem[];

export interface IRegionsListPageProps {
  data: TRegionsListPageData;
}

const RegionsListPage: React.FC<IRegionsListPageProps> = (
  { data }
) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: (param?: FilterConfirmProps | undefined) => void
  ) => {
    if (confirm) {
      confirm();
    }
    
    if (selectedKeys) {
      setSearchText(selectedKeys[0].toString());
    }
    
  };

  const handleReset = (clearFilters: (() => void) | undefined) => {
    if (clearFilters) {
      clearFilters();
    }
    setSearchText('');
  };

  const searchInput = useRef<Input>(null);

  const columns: ColumnProps<TRegionsListPageDataItem>[] = [
    {
      title: 'Region',
      dataIndex: 'regionName',
      key: 'regionName',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search region`}
            value={selectedKeys && selectedKeys[0]}
            onChange={e => setSelectedKeys && setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0].toString());
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record
          ? record.regionName.toString().toLowerCase().includes(value.toString().toLowerCase())
          : false,
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: text => <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    }, {
      title: 'Libraries',
      dataIndex: 'libs',
      key: 'libs',
      render: (libs: IDataItem[]) => <>{
        libs.map(({order, fullname}) => (
          <div key={order}>
            <Link to={`/${order}`}>{fullname}</Link>
          </div>
        ))
      }</>
    }, {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    }
  ];

  return <Table dataSource={data} columns={columns} />
}

export default RegionsListPage;
