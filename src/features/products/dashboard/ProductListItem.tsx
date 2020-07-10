import React, { useContext } from 'react';
import { Button, Label, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../app/models/product';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const ProductListItem: React.FC<{ product: IProduct; index: number }> = ({ product, index }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteProduct, submitting, targetDelete } = rootStore.productStore;
  return (
    <Table.Row key={product.id}>
      <Table.Cell>{index}</Table.Cell>
      <Table.Cell>
        <Label color='green' key={product.id} size='large' as={Link} to={`/products/${product.id}`}>
          {product.name}
        </Label>
      </Table.Cell>
      <Table.Cell>{product.category}</Table.Cell>
      <Table.Cell>{product.brand}</Table.Cell>
      <Table.Cell>{product.stock}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/products/${product.id}`}
            color='blue'
          >
            <Icon name='search plus' />
          </Button>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/products/${product.id}/manage`}
            color='orange'
          >
            <Icon name='edit' />{' '}
          </Button>
          <Button
            name={product.id}
            loading={targetDelete === product.id.toString() && submitting}
            onClick={(e) => deleteProduct(e, product.id)}
            color='red'
          >
            <Icon name='trash alternate' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ProductListItem);
