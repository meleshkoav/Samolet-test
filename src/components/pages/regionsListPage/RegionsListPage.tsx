import { Collapse } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { IDataItem } from 'types';

const { Panel } = Collapse;

export type TRegionsListPageData = { [key: string]: IDataItem[] };

export interface IRegionsListPageProps {
  data: TRegionsListPageData;
}

const RegionsListPage:React.FC<IRegionsListPageProps> = (
  { data }
  ) => (
    <Collapse>
      {Object.entries(data).map(([regionName, libs]) => (
        <Panel key={regionName} header={`${regionName} (${libs.length})`}>
          {libs.map((lib) => (
            <div>
              <Link to={`/${lib.order}`}>{lib.fullname}</Link>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  )

export default RegionsListPage;
