import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ProductListItem from './ProductListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductSearch from './ProductSearch';

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productRegistry, predicate } = rootStore.productStore;
  const lstProduct = Array.from(productRegistry.values());
  return (
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
        <ProductSearch />
        <Table.Row>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>{predicate.get('name')}</Table.Cell>
          <Table.Cell>{predicate.get('category')}</Table.Cell>
          <Table.Cell>{predicate.get('brand')}</Table.Cell>
          <Table.Cell>{predicate.get('stock')}</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        {lstProduct.map((product, index) => (
          <ProductListItem key={product.id} product={product} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(ProductList);
