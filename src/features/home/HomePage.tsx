import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
// import LoginForm from '../user/LoginForm';
// import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  // const { isLoggedIn, user } = rootStore.userStore;
  // const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/Sport.png' alt='logo' style={{ marginBottom: 12 }} />
          SportsStore
        </Header>
        <Fragment>
          <Header as='h2' inverted content={`Welcome SportsStore Management`} />
          <Button as={Link} to='/products' size='huge' inverted>
            Go to Products
          </Button>
        </Fragment>
      </Container>
    </Segment>
  );
};

export default HomePage;
