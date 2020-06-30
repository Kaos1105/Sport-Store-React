import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import ImportList from './ImportList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ImportListItemPlaceholder from './ImportListItemPlaceholder';
import PaginationImport from '../../paginate/PaginationImport';

//pass down props from parent

const ImportDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadImports, loadingInitial } = rootStore.importStore;
  const [, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadImports().then(() => setLoadingNext(false));
  };

  // Similar to componentDidMount and componentDidUpdate:
  // first parameter is componentDidMount, second is componentDidUpdate with return similar to componentUnMount
  useEffect(() => {
    loadImports();
  }, [loadImports]);

  return (
    <Fragment>
      <PaginationImport handlePageChange={handleGetNext} />
      <Grid>
        <Grid.Column width='16'>
          {loadingInitial ? <ImportListItemPlaceholder /> : <ImportList />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ImportDashboard);
