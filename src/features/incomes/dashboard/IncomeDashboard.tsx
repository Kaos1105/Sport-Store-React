import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid, Tab, TabPane, TableBody, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationProduct from '../../paginate/PaginationProduct';
import LineChart from '../../../app/common/chart/LineChart';
import PaginationIncome from '../../paginate/PaginationIncome';
import IncomeListItem from './IncomeListItem';
import IncomeListItemPlaceHolder from './IncomeListItemPlaceHolder';
import IncomeList from './IncomeList';
import IncomeSearch from './IncomeSearch';

//pass down props from parent

const IncomeDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadIncomes, loadingInitial } = rootStore.incomeStore;
  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadIncomes().then(() => setLoadingNext(false));
  };

  //Line data sample
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // const data = [70, 30, 20, 90, 70, 80, 200];
  // const p_data = [65, 0, 80, 81, 56, 55, 40];

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  return (
    <Fragment>
      <PaginationIncome handlePageChange={handleGetNext} />
      <IncomeSearch />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <IncomeListItemPlaceHolder /> : <IncomeList />}
        </Grid.Column>
      </Grid>
      {/* <LineChart
        labels={labels}
        label='Label 1'
        p_label='P label'
        text='Line chart'
        data={data}
        p_data={p_data}
      /> */}
    </Fragment>
  );
};

export default observer(IncomeDashboard);
