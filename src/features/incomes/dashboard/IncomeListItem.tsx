import React from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IIncome } from '../../../app/models/income';

const IncomeListItem: React.FC<{ income: IIncome; index: number }> = ({ income, index }) => {
  return (
    <Table.Row key={index}>
      <Table.Cell>{income.year}</Table.Cell>
      <Table.Cell>{income.month}</Table.Cell>
      <Table.Cell>{income.totalIncome}</Table.Cell>
      <Table.Cell>{income.totalCost}</Table.Cell>
      <Table.Cell>{income.productIncome}</Table.Cell>
      <Table.Cell>{income.productCost}</Table.Cell>
    </Table.Row>
  );
};

export default observer(IncomeListItem);
