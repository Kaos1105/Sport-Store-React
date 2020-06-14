import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import ProductDetails from '../../features/products/details/ProductDetails';
import ProductForm from '../../features/products/form/ProductForm';
import HomePage from '../../features/home/HomePage';

//------------React Hook--------------------------
const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  //const { setAppLoaded, appLoaded } = rootStore.commonStore;

  //if (!appLoaded) return <LoadingComponent content='Loading app...' />;

  return (
    <Fragment>
      {/* <ModalContainer /> */}
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <ToastContainer position='top-center' />
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/products' component={ProductDashboard} />
                <Route exact path='/products/:id' component={ProductDetails} />
                <Route
                  key={location.key}
                  path={['/createProduct', '/products/:id/manage']}
                  component={ProductForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
