import React from 'react';
import { useParams } from 'react-router';
import { IDataItem, TDataItemById } from 'types';

export interface ILibraryDetailsPageProps {
  data: TDataItemById;
}

const LibraryDetailsPage: React.FC<ILibraryDetailsPageProps> = (
  { data }
  ) => {
    const { id } = useParams<{id: string}>();

    const details = data[id];

    if (!details) {
      return <div>No data</div>;
    }

    return <pre>{
      JSON.stringify(details, null, 2)
    }</pre>
  };

export default LibraryDetailsPage;
