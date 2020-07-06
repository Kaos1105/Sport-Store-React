import React, { useContext, useEffect } from 'react';
import { Table, Button, Icon, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUser } from '../../app/models/user';
import { roleOptions } from '../../app/common/sample/roleOptions';

const UserList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    usersRegistry,
    loadUsers,
    targetDelete,
    submitting,
    deleteUser,
    rolesRegistry,
    setRole,
    setRegistryRole,
    targetUpdate,
  } = rootStore.userStore;

  const lstUsers: IUser[] = Array.from(usersRegistry.values());

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Index</Table.HeaderCell>
          <Table.HeaderCell>UserName</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Current Role</Table.HeaderCell>
          <Table.HeaderCell>Edit Role</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {lstUsers.map((user, index) => (
          <Table.Row key={index} className='orderCell'>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{user.userName}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <Dropdown
                options={roleOptions}
                defaultValue={user.role}
                onChange={(e, data) => {
                  setRegistryRole(user.email, data.value!.toString());
                }}
              ></Dropdown>
            </Table.Cell>
            <Table.Cell textAlign='center'>
              {' '}
              <Button.Group>
                <Button
                  color='orange'
                  name={user.email}
                  loading={targetUpdate === user.email.toString() && submitting}
                  onClick={(e) => setRole(e, rolesRegistry.get(user.email))}
                >
                  <Icon name='edit' />
                </Button>
                <Button
                  color='red'
                  name={user.id}
                  loading={targetDelete === user.id.toString() && submitting}
                  onClick={(e) => deleteUser(e, user.email)}
                >
                  <Icon name='trash' />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(UserList);
