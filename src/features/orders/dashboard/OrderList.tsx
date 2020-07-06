import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import OrderListItem from './OrderListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrderSearch from './OrderSearch';

const OrderList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { orderRegistry } = rootStore.orderStore;
  const lstOrders = Array.from(orderRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
        <Table key='table data' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Recipient Name</Table.HeaderCell>
              <Table.HeaderCell>Recipient Address</Table.HeaderCell>
              <Table.HeaderCell>Recipient Phone</Table.HeaderCell>
              <Table.HeaderCell>Placement Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <OrderSearch />
            {lstOrders.map((order, index) => (
              <OrderListItem key={order.id} order={order} index={index + 1} />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(OrderList);
