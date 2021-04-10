import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import './app.css';
import { getData } from "./api";
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import 'antd/dist/antd.css';
import RegionsListPage from 'components/pages/regionsListPage';
import LibraryDetailsPage from 'components/pages/libraryDetailsPage';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <RegionsListPage />
          </Route>
          <Route exact path="/:id/details">
            <LibraryDetailsPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  )

  // return (
  //   <Layout>
  //     <pre>
  //       { JSON.stringify(data, null, 2) }
  //     </pre>
  //   </Layout>
  // );
}
