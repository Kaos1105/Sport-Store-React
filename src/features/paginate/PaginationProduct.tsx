import React, { useContext, Fragment, useState } from 'react';
import { Pagination } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

interface IProps {}

const PaginationProduct: React.FC<IProps> = ({}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts, setPages, page, totalPages } = rootStore.productStore;
  const [loadingPage, setLoadingPage] = useState(false);

  return (
    <Pagination
      defaultActivePage={page}
      totalPages={totalPages}
      onPageChange={(e, { activePage }) => {
        setLoadingPage(true);
        setPages(parseInt(activePage!.toString()));
        loadProducts().then(() => setLoadingPage(false));
      }}
    />
  );
};
export default observer(PaginationProduct);
