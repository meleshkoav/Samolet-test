import { Descriptions } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { IDataItem, TDataItemById } from 'types';

export interface ILibraryDetailsPageProps {
  data: TDataItemById;
}

const { Item } = Descriptions;

const LibraryDetailsPage: React.FC<ILibraryDetailsPageProps> = (
  { data }
  ) => {
    const { id } = useParams<{id: string}>();

    const details = data[id];

    if (!details) {
      return <div>No data</div>;
    }

    return (
      <Descriptions title={details.fullname} bordered column={1}>
        {Object.entries(details).filter(([k]) => k !== 'fullname').map(([field, value]) => (
          <Item label={field}>{value}</Item>
        ))}
      </Descriptions>
    );
  };

export default LibraryDetailsPage;
