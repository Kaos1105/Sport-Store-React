import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  //const { user, logout } = rootStore.userStore;

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Products' as={NavLink} to='/products' />
        <Menu.Item>
          <Button as={NavLink} to='/products/create' positive content='Create Product' />
        </Menu.Item>
        {/* {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profiles/${user.userName}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )} */}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);