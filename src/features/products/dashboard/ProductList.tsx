import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ProductListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns';

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productRegistry } = rootStore.productStore;
  const lstProduct = Array.from(productRegistry.values());
  return (
    <Fragment>
      <Item.Group divided>
        {lstProduct.map((product) => (
          <ActivityListItem key={product.id} product={product} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(ProductList);
