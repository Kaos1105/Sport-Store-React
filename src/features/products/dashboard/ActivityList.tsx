import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { format } from 'date-fns';

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productRegistry } = rootStore.productStore;
  const lstProduct = Array.from(productRegistry.values());
  console.log(lstProduct);
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

export default observer(ActivityList);
