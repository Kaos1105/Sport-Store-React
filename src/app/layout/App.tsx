import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
//import { RootStoreContext } from '../stores/rootStore';
//import LoadingComponent from './LoadingComponent';
//import ModalContainer from '../common/modals/ModalContainer';
import ProductDashboard from '../../features/products/dashboard/ProductDashboard';
import ProductDetails from '../../features/products/details/ProductDetails';
import ProductForm from '../../features/products/form/ProductForm';
import HomePage from '../../features/home/HomePage';
import ModalContainer from '../common/modals/ModalContainer';
import OrderDashboard from '../../features/orders/dashboard/OrderDashboard';
import OrderDetails from '../../features/orders/details/OrderDetails';
import OrderForm from '../../features/orders/form/OrderForm';

//------------React Hook--------------------------
const App: React.FC<RouteComponentProps> = ({ location }) => {
  //const rootStore = useContext(RootStoreContext);
  //const { setAppLoaded, appLoaded } = rootStore.commonStore;

  //if (!appLoaded) return <LoadingComponent content='Loading app...' />;

  return (
    <Fragment>
      <ModalContainer />
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
                  path={['/productsCreate', '/products/:id/manage']}
                  component={ProductForm}
                />
                <Route exact path='/orders' component={OrderDashboard} />
                <Route exact path='/orders/:id' component={OrderDetails} />
                <Route
                  key={location.key}
                  path={['/ordersCreate', '/orders/:id/manage']}
                  component={OrderForm}
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
