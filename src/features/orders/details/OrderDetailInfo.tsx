import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import { IOrder } from '../../../app/models/order';

const OrderDetailInfo: React.FC<{ order: IOrder }> = ({ order }) => {
  const timeZone = 'Asia/Bangkok';
  const utcDate = zonedTimeToUtc(order.placementDate, timeZone);
  return (
    <Segment.Group key={order.id}>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={13}>
            <Icon size='large' color='teal' name='caret square down' />
            <span>Order ID: {order.id}</span>
          </Grid.Column>
          <Grid.Column>
            <Button
              // onClick={() => selectActivity(activity.id)}
              attached='right'
              as={Link}
              to={`/orders/${order.id}/manage`}
              color='orange'
              content='Edit'
            />
          </Grid.Column>
          <Grid.Column width={14}>
            <Icon size='large' color='teal' name='address card outline' />
            <span>Recipient Name: {order.recipientName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='bookmark outline' />
            <span>Recipient Address: {order.recipientAddress}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='phone' />
            <span>Recipient Phone: {order.recipientPhone}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='check square' />
            <span>Status: {order.status}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={15}>
            {' '}
            <Icon name='calendar' size='large' color='teal' />
            Placement Date: {format(utcDate, 'dd/MM/yyyy', { timeZone: timeZone })}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default OrderDetailInfo;
