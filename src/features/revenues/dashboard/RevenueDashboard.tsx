import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationIncome from '../../paginate/PaginationIncome';
import RevenueListItemPlaceHolder from './RevenueListItemPlaceHolder';
import RevenueList from './RevenueList';
import RevenueChart from './RevenueChart';

const RevenueDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadRevenues, loadingInitial } = rootStore.revenueStore;

  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadRevenues().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadRevenues();
  }, [loadRevenues]);

  return (
    <Fragment>
      <PaginationIncome handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <RevenueListItemPlaceHolder /> : <RevenueList />}
        </Grid.Column>
      </Grid>

      <RevenueChart statisticsType='Revenue' />
      <RevenueChart statisticsType='Quantity' />
    </Fragment>
  );
};

export default observer(RevenueDashboard);
