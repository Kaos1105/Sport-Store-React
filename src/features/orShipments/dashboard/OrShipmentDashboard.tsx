import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OrShipmentListItemPlaceholder from './OrShipmentListItemPlaceholder';
import OrShipmentList from './OrShipmentList';
import PaginationOrShipment from '../../paginate/PaginationOrShipment';

//pass down props from parent

const OrShipmentDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadShipments, loadingInitial } = rootStore.orderShipmentStore;
  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadShipments().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadShipments();
  }, [loadShipments]);

  return (
    <Fragment>
      <PaginationOrShipment handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <OrShipmentListItemPlaceholder /> : <OrShipmentList />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(OrShipmentDashboard);
