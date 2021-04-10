import React from 'react';
import { IDataItem } from 'types';

export type TRegionsListPageData = { [key: string]: IDataItem[] };

export interface IRegionsListPageProps {
  data: TRegionsListPageData;
}

const RegionsListPage:React.FC<IRegionsListPageProps> = ({ data }) => <pre>{
  JSON.stringify(data, null, 2)
}</pre>

export default RegionsListPage;
