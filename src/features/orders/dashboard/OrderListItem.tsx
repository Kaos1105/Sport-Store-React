import React, { useContext } from 'react';
import { Button, Label, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { IOrder } from '../../../app/models/order';
import { format, zonedTimeToUtc } from 'date-fns-tz';

const OrderListItem: React.FC<{ order: IOrder; index: number }> = ({ order, index }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteOrder, submitting, targetDelete } = rootStore.orderStore;

  const timeZone = 'Asia/Bangkok';
  return (
    <Table.Row key={index}>
      <Table.Cell>{order.id}</Table.Cell>
      <Table.Cell>
        <Label color='green' key={order.id} size='large' as={Link} to={`#`}>
          {order.recipientName}
        </Label>
      </Table.Cell>
      <Table.Cell>{order.recipientAddress}</Table.Cell>
      <Table.Cell>{order.recipientPhone}</Table.Cell>
      <Table.Cell>
        {format(zonedTimeToUtc(order.placementDate, timeZone), 'dd/MM/yyyy', {
          timeZone: timeZone,
        })}
      </Table.Cell>
      <Table.Cell>{order.status}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/orders/${order.id}`}
            color='blue'
          >
            <Icon name='search plus' />
          </Button>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/orders/${order.id}/manage`}
            color='orange'
          >
            <Icon name='edit' />{' '}
          </Button>
          <Button
            name={order.id}
            loading={targetDelete === order.id.toString() && submitting}
            onClick={(e) => deleteOrder(e, order.id)}
            color='red'
          >
            <Icon name='trash alternate' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(OrderListItem);
