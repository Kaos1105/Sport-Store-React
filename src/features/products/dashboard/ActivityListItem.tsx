import React from 'react';
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import ActivityStore from '../../../app/stores/activityStore';
import { IProduct } from '../../../app/models/product';
import { format } from 'date-fns';

const ActivityListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  //const activityStore = useContext(ActivityStore);
  // const { deleteActivity, submitting, targetDelete } = activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/products/${product.id}`}>
                {product.name}
              </Item.Header>
              <Item.Extra>
                {/* <Button
            name={activity.id}
            loading={targetDelete === activity.id && submitting}
            onClick={(e) => deleteActivity(e, activity.id)}
            floated='right'
            content='Delete'
            color='red'
          /> */}
                <Label basic content={product.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' />
        {format(product.dateAdded, 'dd/mm/yyy')}
        <Icon name='marker' />
        {product.price}, {product.importPrice}
      </Segment>
      <Segment secondary>{product.brand}</Segment>
      <Segment clearing>
        <span>{product.description}</span>
        <Button
          // onClick={() => selectActivity(activity.id)}
          as={Link}
          to={`/products/${product.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
