import React, { useContext } from 'react';
import { Button, Label, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { IIncome } from '../../../app/models/income';

const ProductListItem: React.FC<{ income: IIncome; index: number }> = ({ income, index }) => {
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

export default observer(ProductListItem);
