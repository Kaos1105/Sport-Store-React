import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailInfo from './ActivityDetailInfo';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedProduct: activity, loadActivity, loadingInitial } = rootStore.productStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;
  if (!activity) return <h2>Activity not found</h2>;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityDetailInfo product={activity} />
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetails);
