import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductDetailInfo from './ProductDetailInfo';
import ProductDetailInfoPlaceholder from './ProductDetailInfoPlaceholder';

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedProduct: product, loadProduct, loadingInitial } = rootStore.productStore;
  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id, history, product?.image]);

  //if (loadingInitial) return <LoadingComponent content='Loading product...' />;
  if (loadingInitial) return <ProductDetailInfoPlaceholder />;
  if (!product) return <h2>Product not found</h2>;

  return (
    <Grid>
      <GridColumn width={10}>
        <ProductDetailInfo product={product} />
      </GridColumn>
    </Grid>
  );
};

export default observer(ProductDetails);
