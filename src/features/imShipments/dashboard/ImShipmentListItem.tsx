import React, { useContext } from 'react';
import { Button, Label, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { IShipment } from '../../../app/models/shipment';

const ImShipmentListItem: React.FC<{ shipment: IShipment; index: number }> = ({
  shipment,
  index,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteShipment, submitting, targetDelete } = rootStore.importShipmentStore;

  const timeZone = 'Asia/Bangkok';
  return (
    <Table.Row key={shipment.id}>
      <Table.Cell>{index}</Table.Cell>
      <Table.Cell>
        <Label
          color='green'
          key={shipment.id}
          size='large'
          as={Link}
          to={`/imports/${shipment.importID}`}
        >
          {shipment.importID}
        </Label>
      </Table.Cell>
      <Table.Cell>{shipment.shipmentID}</Table.Cell>
      <Table.Cell>{shipment.shipmentCompany}</Table.Cell>
      <Table.Cell>{shipment.shipmentStatus}</Table.Cell>
      <Table.Cell>
        {format(zonedTimeToUtc(shipment.deliverDate, timeZone), 'dd/MM/yyyy', {
          timeZone: timeZone,
        })}
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/importShipment/${shipment.id}`}
            color='blue'
          >
            <Icon name='search plus' />
          </Button>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/importShipment/${shipment.id}/manage`}
            color='orange'
          >
            <Icon name='edit' />{' '}
          </Button>
          <Button
            name={shipment.id}
            loading={targetDelete === shipment.id.toString() && submitting}
            onClick={(e) => deleteShipment(e, shipment.id)}
            color='red'
          >
            <Icon name='trash alternate' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ImShipmentListItem);
