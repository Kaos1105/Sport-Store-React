import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ProductDetailInfo from './ProductDetailInfo';

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedProduct: activity, loadProduct, loadingInitial } = rootStore.productStore;
  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;
  if (!activity) return <h2>Activity not found</h2>;

  return (
    <Grid>
      <GridColumn width={10}>
        <ProductDetailInfo product={activity} />
      </GridColumn>
    </Grid>
  );
};

export default observer(ProductDetails);
