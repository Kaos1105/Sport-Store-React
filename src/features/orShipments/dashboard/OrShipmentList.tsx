import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrShipmentSearch from './OrShipmentSearch';
import OrShipmentListItem from './OrShipmentListItem';

const OrShipmentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { shipmentRegistry, predicate } = rootStore.orderShipmentStore;
  const lstShipments = Array.from(shipmentRegistry.values());
  return (
    <Table key='table data' celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>Order ID</Table.HeaderCell>
          <Table.HeaderCell>Shipment ID</Table.HeaderCell>
          <Table.HeaderCell>Shipment Company</Table.HeaderCell>
          <Table.HeaderCell>Shipment Status</Table.HeaderCell>
          <Table.HeaderCell>Delivery Date</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <OrShipmentSearch />
        <Table.Row>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>{predicate.get('orderID')}</Table.Cell>
          <Table.Cell>{predicate.get('shipmentID')}</Table.Cell>
          <Table.Cell>{predicate.get('shipmentCompany')}</Table.Cell>
          <Table.Cell>{predicate.get('shipmentStatus')}</Table.Cell>
          <Table.Cell>{predicate.get('deliverDate')}</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        {lstShipments.map((shipment, index) => (
          <OrShipmentListItem key={shipment.id} shipment={shipment} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(OrShipmentList);
