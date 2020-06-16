import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ProductList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationProduct from '../../paginate/PaginationProduct';

//pass down props from parent

const ProductDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts, loadingInitial } = rootStore.productStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadProducts().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loadingInitial) return <LoadingComponent content={'Loading component...'} />;

  return (
    <Fragment>
      <PaginationProduct handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {
            // <List>
            //   {activities.map((activity) => (
            //     <List.Item key={activity.id}>{activity.title}</List.Item>
            //   ))}
            // </List>
            <ActivityList />
          }
        </Grid.Column>
        <Grid.Column width='4'>
          {/* only render if selectedActivity is not null */}
          {/* {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            //Keys help React identify which items have changed so that will re-render
            key={(selectedActivity && selectedActivity.id) || 0}
          />
        )} */}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ProductDashboard);
