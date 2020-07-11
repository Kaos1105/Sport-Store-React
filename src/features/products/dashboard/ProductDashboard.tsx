import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ProductList from './ProductList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationProduct from '../../paginate/PaginationProduct';
import ProductListItemPlaceHolder from './ProductListItemPlaceHolder';

//pass down props from parent

const ProductDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts, loadingInitial } = rootStore.productStore;
  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadProducts().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Fragment>
      <PaginationProduct handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <ProductListItemPlaceHolder /> : <ProductList />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ProductDashboard);
