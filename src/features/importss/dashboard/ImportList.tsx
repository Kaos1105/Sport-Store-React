import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ImportListItem from './ImportListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImportSearch from './ImportSearch';

const ImportList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { importRegistry, predicate } = rootStore.importStore;
  const lstImports = Array.from(importRegistry.values());
  return (
    <Table key='table data' celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Import ID</Table.HeaderCell>
          <Table.HeaderCell>Wholesaler Name</Table.HeaderCell>
          <Table.HeaderCell>Wholesaler Address</Table.HeaderCell>
          <Table.HeaderCell>Wholesaler Phone</Table.HeaderCell>
          <Table.HeaderCell>Placement Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <ImportSearch />
        <Table.Row>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>{predicate.get('name')}</Table.Cell>
          <Table.Cell>{predicate.get('address')}</Table.Cell>
          <Table.Cell>{predicate.get('phone')}</Table.Cell>
          <Table.Cell>{predicate.get('date')}</Table.Cell>
          <Table.Cell>{predicate.get('status')}</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        {lstImports.map((importDTO, index) => (
          <ImportListItem key={importDTO.id} importDTO={importDTO} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(ImportList);
