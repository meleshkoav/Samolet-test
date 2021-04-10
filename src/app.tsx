import React, { useEffect, useMemo, useState } from 'react';
import './app.css';
import { getData } from "./api";
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import 'antd/dist/antd.css';
import RegionsListPage, { TRegionsListPageData } from 'components/pages/regionsListPage';
import LibraryDetailsPage from 'components/pages/libraryDetailsPage';
import _ from 'lodash';
import { IDataItem, TDataItemById } from 'types';

export default function App() {
  const [data, setData] = useState<IDataItem[]>([]);

  const regionListData = useMemo<TRegionsListPageData>(() => Object.entries(
    _.groupBy(data, "territory")
    ).map(([regionName, libs]) => ({
      regionName,
      count: libs.length,
      libs,
    })), [data]);

  const dataItemsById = useMemo<TDataItemById>(() => Object.fromEntries(
      data.map((item) => [`${item.order}`, item])
    ), [data]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <>
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <RegionsListPage data={regionListData} />
          </Route>
          <Route path="/:id">
            <LibraryDetailsPage data={dataItemsById} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
    </>
  )
}
