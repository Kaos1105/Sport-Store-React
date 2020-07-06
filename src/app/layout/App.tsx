import React, { Fragment, useContext, useEffect } from 'react';
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
import ImportDashboard from '../../features/importss/dashboard/ImportDashboard';
import ImportDetails from '../../features/importss/details/ImportDetails';
import ImportForm from '../../features/importss/form/ImportForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import UserList from '../../features/user/UserList';
import ImShipmentDashboard from '../../features/imShipments/dashboard/ImShipmentDashboard';
import ImShipmentDetails from '../../features/imShipments/details/ImShipmentDetails';
import ImShipmentForm from '../../features/imShipments/form/ImShipmentForm';
import OrShipmentDashboard from '../../features/orShipments/dashboard/OrShipmentDashboard';
import OrShipmentDetails from '../../features/orShipments/details/OrShipmentDetails';
import OrShipmentForm from '../../features/orShipments/form/OrShipmentForm';

//------------React Hook--------------------------
const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  //get user from token when refresh App.tsx or re-render App.tsx
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content='Loading app...' />;

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
                  path={['/orderCreate', '/orders/:id/manage']}
                  component={OrderForm}
                />

                <Route exact path='/imports' component={ImportDashboard} />
                <Route exact path='/imports/:id' component={ImportDetails} />
                <Route
                  key={location.key}
                  path={['/importCreate', '/imports/:id/manage']}
                  component={ImportForm}
                />

                <Route exact path='/importShipment' component={ImShipmentDashboard} />
                <Route exact path='/importShipment/:id' component={ImShipmentDetails} />
                <Route
                  key={location.key}
                  path={['/importShipmentCreate', '/importShipment/:id/manage']}
                  component={ImShipmentForm}
                />

                <Route exact path='/orderShipment' component={OrShipmentDashboard} />
                <Route exact path='/orderShipment/:id' component={OrShipmentDetails} />
                <Route
                  key={location.key}
                  path={['/orderShipmentCreate', '/orderShipment/:id/manage']}
                  component={OrShipmentForm}
                />

                <Route exact path='/users/manage' component={UserList} />

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
