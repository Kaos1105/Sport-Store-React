import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import OrderList from './OrderList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrderListItemPlaceholder from './OrderListItemPlaceholder';
import PaginationOrder from '../../paginate/PaginationOrder';

//pass down props from parent

const OrderDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadOrders, loadingInitial } = rootStore.orderStore;
  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadOrders().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <Fragment>
      <PaginationOrder handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <OrderListItemPlaceholder /> : <OrderList />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(OrderDashboard);
