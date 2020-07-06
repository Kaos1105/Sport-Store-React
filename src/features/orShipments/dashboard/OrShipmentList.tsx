import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrShipmentSearch from './OrShipmentSearch';
import OrShipmentListItem from './OrShipmentListItem';

const OrShipmentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { shipmentRegistry } = rootStore.orderShipmentStore;
  const lstShipments = Array.from(shipmentRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
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
            {lstShipments.map((shipment, index) => (
              <OrShipmentListItem key={shipment.id} shipment={shipment} index={index + 1} />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(OrShipmentList);
