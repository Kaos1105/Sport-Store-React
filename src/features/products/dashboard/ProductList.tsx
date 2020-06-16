import React, { useContext, Fragment } from 'react';
import { Item, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ProductListItem from './ProductListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductSearch from './ProductSearch';

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productRegistry } = rootStore.productStore;
  const lstProduct = Array.from(productRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
        <Table key='table data' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Index</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Brand</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <ProductSearch></ProductSearch>
            {lstProduct.map((product, index) => (
              <ProductListItem key={product.id} product={product} index={index + 1} />
            ))}
          </Table.Body>
        </Table>
      </Item.Group>
    </Fragment>
  );
};

export default observer(ProductList);
