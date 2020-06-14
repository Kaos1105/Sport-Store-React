import React from 'react';
import { Segment, Grid, Icon, Label, Button, GridColumn } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const ProductDetailInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Segment.Group key={product.id}>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={5}>
            <Label color='teal' size='large'>
              {product.name}
            </Label>
          </Grid.Column>
          <Grid.Column>
            <Button
              // onClick={() => selectActivity(activity.id)}
              as={Link}
              to={`/products/${product.id}/manage`}
              color='orange'
              content='Edit'
            />
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={5}>
            <Icon size='large' color='teal' name='bookmark outline' />
            <span>Product Category: {product.category}</span>
          </Grid.Column>
          <Grid.Column width={5}>
            <Icon size='large' color='teal' name='amazon' />
            <span>Product Brand: {product.brand}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={15}>
            {' '}
            <Icon name='calendar' size='large' color='teal' />
            Date added: {product.dateAdded}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={11}>
            <Icon name='dollar sign' size='large' color='teal' />
            <span>Import price: {product.importPrice}</span>
          </Grid.Column>
          <Grid.Column width={11}>
            <Icon name='dollar sign' size='large' color='teal' />
            <span>Price: {product.price}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ProductDetailInfo;
