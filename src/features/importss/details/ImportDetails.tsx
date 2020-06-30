import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImportDetailInfoPlaceholder from './ImportDetailInfoPlaceholder';
import ImportDetailInfo from './ImportDetailInfo';
import ImportProduct from './ImportProduct';

interface DetailParams {
  id: string;
}

const ImportDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedImport: importDTO, loadImport, loadingInitial } = rootStore.importStore;
  useEffect(() => {
    loadImport(match.params.id);
  }, [loadImport, match.params.id, history]);

  //if (loadingInitial) return <LoadingComponent content='Loading product...' />;
  if (loadingInitial) return <ImportDetailInfoPlaceholder />;
  if (!importDTO) return <h2>Import not found</h2>;

  return (
    <Grid>
      <GridColumn width={6}>
        <ImportDetailInfo importDTO={importDTO} />
      </GridColumn>
      <GridColumn width={10}>
        <ImportProduct />
      </GridColumn>
    </Grid>
  );
};

export default observer(ImportDetails);
