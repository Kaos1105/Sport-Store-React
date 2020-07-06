import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import { IImport } from '../../../app/models/import';

const ImportDetailInfo: React.FC<{ importDTO: IImport }> = ({ importDTO }) => {
  const timeZone = 'Asia/Bangkok';
  const utcDate = zonedTimeToUtc(importDTO.placementDate, timeZone);
  return (
    <Segment.Group key={importDTO.id}>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={13}>
            <Icon size='large' color='teal' name='caret square down' />
            <span>Import ID: {importDTO.id}</span>
          </Grid.Column>
          <Grid.Column>
            <Button
              // onClick={() => selectActivity(activity.id)}
              attached='right'
              as={Link}
              to={`/imports/${importDTO.id}/manage`}
              color='orange'
              content='Edit'
            />
          </Grid.Column>
          <Grid.Column width={14}>
            <Icon size='large' color='teal' name='address card outline' />
            <span>Wholesaler Name: {importDTO.wholesalerName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='bookmark outline' />
            <span>Wholesaler Address: {importDTO.wholesalerAddress}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='phone' />
            <span>Wholesaler Phone: {importDTO.wholesalerPhone}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='check square' />
            <span>Status: {importDTO.status}</span>
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

export default ImportDetailInfo;
