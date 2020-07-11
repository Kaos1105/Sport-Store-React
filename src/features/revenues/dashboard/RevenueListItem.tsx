import React from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IRevenue } from '../../../app/models/revenue';

const RevenueListItem: React.FC<{ revenue: IRevenue; index: number }> = ({ revenue, index }) => {
  return (
    <Table.Row key={index}>
      <Table.Cell>{revenue.year}</Table.Cell>
      <Table.Cell>{revenue.month}</Table.Cell>
      <Table.Cell>{revenue.totalRevenue}</Table.Cell>
      <Table.Cell>{revenue.totalQuantity}</Table.Cell>
      <Table.Cell>{revenue.productRevenue}</Table.Cell>
      <Table.Cell>{revenue.productQuantity}</Table.Cell>
    </Table.Row>
  );
};

export default observer(RevenueListItem);
