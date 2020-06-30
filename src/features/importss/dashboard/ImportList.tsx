import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ImportListItem from './ImportListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImportSearch from './ImportSearch';

const ImportList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { importRegistry } = rootStore.importStore;
  const lstImports = Array.from(importRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
        <Table key='table data' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Index</Table.HeaderCell>
              <Table.HeaderCell>Wholesaler Name</Table.HeaderCell>
              <Table.HeaderCell>Wholesaler Address</Table.HeaderCell>
              <Table.HeaderCell>Wholesaler Phone</Table.HeaderCell>
              <Table.HeaderCell>Placement Date</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <ImportSearch />
            {lstImports.map((importDTO, index) => (
              <ImportListItem key={importDTO.id} importDTO={importDTO} index={index + 1} />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(ImportList);
