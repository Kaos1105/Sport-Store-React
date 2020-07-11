import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import OrderListItem from './OrderListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrderSearch from './OrderSearch';

const OrderList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { orderRegistry, predicate } = rootStore.orderStore;
  const lstOrders = Array.from(orderRegistry.values());
  return (
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
        <Table.Row>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>{predicate.get('name')}</Table.Cell>
          <Table.Cell>{predicate.get('address')}</Table.Cell>
          <Table.Cell>{predicate.get('phone')}</Table.Cell>
          <Table.Cell>{predicate.get('date')}</Table.Cell>
          <Table.Cell>{predicate.get('status')}</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        {lstOrders.map((order, index) => (
          <OrderListItem key={order.id} order={order} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(OrderList);
