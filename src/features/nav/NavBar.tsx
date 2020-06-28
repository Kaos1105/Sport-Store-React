import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
//import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/Sport.png' alt='logo' style={{ marginRight: '10px' }} />
          SportsStore
        </Menu.Item>
        <Menu.Item name='Products' as={NavLink} to='/products' />
        <Menu.Item>
          <Button as={NavLink} to='/productsCreate' positive content='Create Product' />
        </Menu.Item>
        <Menu.Item name='Orders' as={NavLink} to='/orders' />
        <Menu.Item>
          <Button as={NavLink} to='/orderCreate' positive content='Create Order' />
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={'/assets/user.png'} />
            <Dropdown pointing='top left' text={user.userName}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                <Dropdown.Item onClick={logout} text='Edit user' icon='edit outline' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
