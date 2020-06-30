import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrderDetailInfoPlaceholder from './OrderDetailInfoPlaceholder';
import OrderDetailInfo from './OrderDetailInfo';
import OrderProduct from './OrderProduct';

interface DetailParams {
  id: string;
}

const OrderDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedOrder: order, loadOrder, loadingInitial } = rootStore.orderStore;
  useEffect(() => {
    loadOrder(match.params.id);
  }, [loadOrder, match.params.id, history]);

  //if (loadingInitial) return <LoadingComponent content='Loading product...' />;
  if (loadingInitial) return <OrderDetailInfoPlaceholder />;
  if (!order) return <h2>Order not found</h2>;

  return (
    <Grid>
      <GridColumn width={6}>
        <OrderDetailInfo order={order} />
      </GridColumn>
      <GridColumn width={10}>
        <OrderProduct />
      </GridColumn>
    </Grid>
  );
};

export default observer(OrderDetails);
