import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { format } from 'date-fns';

const ActivityDetailInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
            <p>{product.name}</p>
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{product.category}</p>
            <p>{product.brand}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>{product.dateAdded}</Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {product.price}, {product.importPrice}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailInfo;
