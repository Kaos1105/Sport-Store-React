import React from 'react';
import { Segment, Grid, Icon, Button, Label } from 'semantic-ui-react';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import { IShipment } from '../../../app/models/shipment';

const ImShipmentDetailInfo: React.FC<{ shipment: IShipment }> = ({ shipment }) => {
  const timeZone = 'Asia/Bangkok';
  const utcDate = zonedTimeToUtc(shipment.deliverDate, timeZone);
  return (
    <Segment.Group key={shipment.id}>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={14}>
            <Icon size='large' color='teal' name='address card outline' />
            <Label as={Link} to={`/imports/${shipment.importID}`} color='teal'>
              Import ID: {shipment.importID}
            </Label>
          </Grid.Column>
          <Button
            // onClick={() => selectActivity(activity.id)}
            attached='right'
            as={Link}
            to={`/importShipment/${shipment.id}/manage`}
            color='orange'
            content='Edit'
          />
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='bookmark outline' />
            <span>Shipment ID: {shipment.shipmentID}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='building outline' />
            <span>Shipment Company: {shipment.shipmentCompany}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='check square' />
            <span>Status: {shipment.shipmentStatus}</span>
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

export default ImShipmentDetailInfo;
