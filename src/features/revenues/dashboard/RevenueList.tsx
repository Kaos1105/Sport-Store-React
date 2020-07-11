import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import TableToExcel from '../../../app/common/exportTable/TableToExcel';
import RevenueSearch from './RevenueSearch';
import RevenueListItem from './RevenueListItem';

const RevenueList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { revenueRegistry, predicate } = rootStore.revenueStore;
  const { productOptionsRegistry } = rootStore.orderOptions;
  const lstRevenue = Array.from(revenueRegistry.values());

  const tableId = 'revenueTable';
  return (
    <Fragment>
      <Item.Group divided>
        <Table celled>
          <Table.Header>
            <RevenueSearch />
            <Table.Row>
              <Table.Cell colSpan='2'>{predicate.get('begin')}</Table.Cell>
              <Table.Cell colSpan='2'>{predicate.get('end')}</Table.Cell>
              <Table.Cell>
                {productOptionsRegistry.find((element) => element.key == predicate.get('id'))
                  ?.text || 0}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <TableToExcel table={tableId} />
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table key='table data' celled id={tableId}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Month</Table.HeaderCell>
              <Table.HeaderCell>Total Revenue</Table.HeaderCell>
              <Table.HeaderCell>Total Quantity</Table.HeaderCell>
              <Table.HeaderCell>Product Revenue</Table.HeaderCell>
              <Table.HeaderCell>Product Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {lstRevenue.map((revenue, index) => (
              <RevenueListItem
                key={`${revenue.month}-${revenue.year}`}
                revenue={revenue}
                index={index + 1}
              />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(RevenueList);
