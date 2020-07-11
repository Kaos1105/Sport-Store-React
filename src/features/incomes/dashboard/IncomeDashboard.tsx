import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationIncome from '../../paginate/PaginationIncome';
import IncomeListItemPlaceHolder from './IncomeListItemPlaceHolder';
import IncomeList from './IncomeList';
import IncomeChart from './IncomeChart';

//pass down props from parent

const IncomeDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadIncomes, loadingInitial, predicate } = rootStore.incomeStore;

  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadIncomes().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  return (
    <Fragment>
      <PaginationIncome handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <IncomeListItemPlaceHolder /> : <IncomeList />}
        </Grid.Column>
      </Grid>

      <IncomeChart statisticsType='Income' />
      <IncomeChart statisticsType='Cost' />
    </Fragment>
  );
};

export default observer(IncomeDashboard);
