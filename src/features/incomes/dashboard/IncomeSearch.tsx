import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

interface IProps {}

const IncomeSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, loadFilters } = rootStore.incomeStore;
  const { loadOptions, productOptionsRegistry } = rootStore.orderOptions;

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return (
    <Table.Row key='searchRow'>
      <Table.HeaderCell colSpan='2'>
        <DateTimePicker
          format='dd/MM/yyyy'
          time={false}
          onChange={(date, dateString) => {
            let dateParam = date?.toISOString().split('T')[0];
            //dateString = dateString?.replace(/\//g, '-');
            setPredicate('begin', dateParam!);
          }}
        />
      </Table.HeaderCell>
      <Table.HeaderCell colSpan='2'>
        <DateTimePicker
          format='dd/MM/yyyy'
          time={false}
          onChange={(date, dateString) => {
            let dateParam = date?.toISOString().split('T')[0];
            //dateString = dateString?.replace(/\//g, '-');
            setPredicate('end', dateParam!);
          }}
        />
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Dropdown
          fluid={false}
          placeholder='Select product'
          search
          selection
          onChange={(e, data) => {
            console.log(data.value);
            setPredicate('id', data.value?.toString() != undefined ? data.value?.toString() : 0);
          }}
          options={productOptionsRegistry}
        />
      </Table.HeaderCell>
      <Table.HeaderCell textAlign='center'>
        <Button.Group>
          <Button color='green' onClick={() => loadFilters(false)}>
            <Icon name='search' />
          </Button>
          <Button color='grey' onClick={() => loadFilters(true)}>
            <Icon name='redo' />
          </Button>
        </Button.Group>
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default observer(IncomeSearch);
