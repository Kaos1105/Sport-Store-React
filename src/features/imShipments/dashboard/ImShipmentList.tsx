import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImShipmentListItem from './ImShipmentListItem';
import ImShipmentSearch from './ImShipmentSearch';

const ImShipmentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { shipmentRegistry } = rootStore.importShipmentStore;
  const lstShipments = Array.from(shipmentRegistry.values());
  return (
    <Table key='table data' celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>Import ID</Table.HeaderCell>
          <Table.HeaderCell>Shipment ID</Table.HeaderCell>
          <Table.HeaderCell>Shipment Company</Table.HeaderCell>
          <Table.HeaderCell>Shipment Status</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <ImShipmentSearch />
        {lstShipments.map((shipment, index) => (
          <ImShipmentListItem key={shipment.id} shipment={shipment} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(ImShipmentList);
