import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { category } from '../../../app/common/sample/categoryOptions';

interface IProps {}

const ProductSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.productStore;

  return (
    <Table.Row key='searchRow'>
      <Table.Cell></Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='nameSearch'
            placeholder='Name...'
            onBlur={(e) => {
              setPredicate('name', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <Dropdown fluid={false} placeholder='Select category' search selection options={category} />
      </Table.Cell>
      <Table.Cell>
        <Dropdown fluid={false} placeholder='Select brand' search selection options={category} />
      </Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='stockSearch'
            placeholder='Stock...'
            type='number'
            onBlur={(e) => {
              setPredicate('stock', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button color='green' onClick={() => setPredicate('final', 'true')}>
            <Icon name='search' />
            Search
          </Button>
          <Button
            color='grey'
            onClick={() => {
              setPredicate('final', 'false');
            }}
          >
            <Icon name='redo' />
            Reset
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ProductSearch);
