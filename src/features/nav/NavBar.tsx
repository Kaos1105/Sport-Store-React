import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import RegisterForm from '../user/RegisterForm';
import EditForm from '../user/EditForm';
//import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/Sport.png' alt='logo' style={{ marginRight: '10px' }} />
          SportsStore
        </Menu.Item>
        <Menu.Item name='Products' as={NavLink} to='/products' />
        {/* <Menu.Item>
          <Button as={NavLink} to='/productsCreate' positive content='Create Product' />
        </Menu.Item> */}
        <Menu.Item name='Imports' as={NavLink} to='/imports' />
        <Menu.Item name='Orders' as={NavLink} to='/orders' />

        <Menu.Item>
          <Dropdown
            pointing='top left'
            text='Shipment'
            labeled
            button
            className='button blue icon inverted'
          >
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to='/importShipment' content='Import Shipment' />
              <Dropdown.Item as={NavLink} to='/orderShipment' content='Order Shipment' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            pointing='top left'
            text='Statistics'
            labeled
            button
            className='button purple icon inverted'
          >
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to='/income' content='Income Statistics' />
              <Dropdown.Item as={NavLink} to='/revenue' content='Revenue Statistics' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item>
          <Dropdown pointing='top left' text='Create' labeled button className='button teal icon'>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to='/productsCreate' content='Create Product' />
              <Dropdown.Item as={NavLink} to='/orderCreate' content='Create Order' />
              <Dropdown.Item as={NavLink} to='/importCreate' content='Create Import' />
              <Dropdown.Item
                as={NavLink}
                to='/importShipmentCreate'
                content='Create Shipment Import'
              />
              <Dropdown.Item
                as={NavLink}
                to='/orderShipmentCreate'
                content='Create Shipment Order'
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        {user?.role === 'Admin' && (
          <Menu.Item>
            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
              Register
            </Button>
          </Menu.Item>
        )}

        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={'/assets/user.png'} />
            <Dropdown pointing='top left' text={user.userName}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                <Dropdown.Item
                  onClick={() => openModal(<EditForm />)}
                  text='Edit user'
                  icon='edit outline'
                />
                {user?.role === 'Admin' && (
                  <Dropdown.Item
                    as={NavLink}
                    to='/users/manage'
                    content='Manage Users'
                    icon='clipboard outline'
                  />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
