import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PaginationImShipment from '../../paginate/PaginationImShipment';
import ImShipmentListItemPlaceholder from './ImShipmentListItemPlaceholder';
import ImShipmentList from './ImShipmentList';

//pass down props from parent

const ImShipmentDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadShipments, loadingInitial } = rootStore.importShipmentStore;
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
      <PaginationImShipment handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <ImShipmentListItemPlaceholder /> : <ImShipmentList />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ImShipmentDashboard);
