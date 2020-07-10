import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import IncomeSearch from './IncomeSearch';
import IncomeListItem from './IncomeListItem';

const IncomeList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { incomeRegistry } = rootStore.incomeStore;
  const lstIncome = Array.from(incomeRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
        <Table key='table data' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Month</Table.HeaderCell>
              <Table.HeaderCell>Total Income</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
              <Table.HeaderCell>Product Income</Table.HeaderCell>
              <Table.HeaderCell>Product Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {lstIncome.map((income, index) => (
              <IncomeListItem
                key={`${income.month}-${income.year}`}
                income={income}
                index={index + 1}
              />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(IncomeList);
