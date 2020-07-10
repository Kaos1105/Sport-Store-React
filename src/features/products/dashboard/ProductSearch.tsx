import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {}

const ProductSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, loadFilters } = rootStore.productStore;
  const { loadOptions, categoryOptionsRegistry, brandOptionsRegistry } = rootStore.productOptions;
  const [cleared, setClear] = useState(false);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

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
        <Dropdown
          fluid={false}
          placeholder='Select category'
          search
          selection
          onChange={(e, data) => {
            setPredicate('category', data.value!.toString());
          }}
          options={categoryOptionsRegistry}
        />
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          fluid={false}
          placeholder='Select brand'
          search
          selection
          onChange={(e, data) => {
            setPredicate('brand', data.value!.toString());
          }}
          options={brandOptionsRegistry}
        />
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
          <Button color='green' onClick={() => loadFilters(false)}>
            <Icon name='search' />
          </Button>
          <Button
            color='grey'
            onClick={() => {
              setClear(true);
              loadFilters(true);
            }}
          >
            <Icon name='redo' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ProductSearch);
