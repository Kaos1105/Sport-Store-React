import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImShipmentDetailInfoPlaceholder from './ImShipmentDetailInfoPlaceholder';
import ImShipmentDetailInfo from './ImShipmentDetailInfo';

interface DetailParams {
  id: string;
}

const OrderDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedShipment: shipment,
    loadShipment,
    loadingInitial,
  } = rootStore.importShipmentStore;
  useEffect(() => {
    loadShipment(match.params.id);
  }, [loadShipment, match.params.id, history]);

  //if (loadingInitial) return <LoadingComponent content='Loading product...' />;
  if (loadingInitial) return <ImShipmentDetailInfoPlaceholder />;
  if (!shipment) return <h2>Shipment not found</h2>;

  return (
    <Grid>
      <GridColumn width={6}>
        <ImShipmentDetailInfo shipment={shipment} />
      </GridColumn>
    </Grid>
  );
};

export default observer(OrderDetails);
