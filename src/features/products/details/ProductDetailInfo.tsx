import React from 'react';
import { Segment, Grid, Icon, Label, Button } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import ProductPhoto from './ProductPhoto';

const ProductDetailInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  const timeZone = 'Asia/Bangkok';
  const utcDate = zonedTimeToUtc(product.dateAdded, timeZone);
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
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='bookmark outline' />
            <span>Product Category: {product.category}</span>
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon size='large' color='teal' name='steam' />
            <span>Product Brand: {product.brand}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={15}>
            {' '}
            <Icon name='calendar' size='large' color='teal' />
            Date added: {format(utcDate, 'dd/MM/yyyy', { timeZone: timeZone })}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={15}>
            {' '}
            <Icon name='unordered list' size='large' color='teal' />
            Stock: {product.stock}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid>
          <Grid.Column width={5}>
            <Icon name='dollar sign' size='large' color='teal' />
            <span>Import price: {product.importPrice}</span>
          </Grid.Column>
          <Grid.Column width={5}>
            <Icon name='dollar sign' size='large' color='teal' />
            <span>Price: {product.price}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <ProductPhoto />
      </Segment>
    </Segment.Group>
  );
};

export default ProductDetailInfo;
