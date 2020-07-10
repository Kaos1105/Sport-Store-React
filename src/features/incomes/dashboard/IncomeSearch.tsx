import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

interface IProps {}

const IncomeSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, predicate } = rootStore.incomeStore;
  const { loadOptions, productOptionsRegistry } = rootStore.orderOptions;

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return (
    <Table>
      <Table.Row key='searchRow'>
        <Table.Cell colSpan='2'>
          <DateTimePicker
            format='dd/MM/yyyy'
            time={false}
            onChange={(date, dateString) => {
              let dateParam = date?.toISOString().split('T')[0];
              //dateString = dateString?.replace(/\//g, '-');
              setPredicate('begin', dateParam!);
            }}
          />
        </Table.Cell>
        <Table.Cell colSpan='2'>
          <DateTimePicker
            format='dd/MM/yyyy'
            time={false}
            onChange={(date, dateString) => {
              let dateParam = date?.toISOString().split('T')[0];
              //dateString = dateString?.replace(/\//g, '-');
              setPredicate('end', dateParam!);
            }}
          />
        </Table.Cell>
        <Table.Cell>
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
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Button.Group>
            <Button color='green' onClick={() => setPredicate('final', 'true')}>
              <Icon name='search' />
            </Button>
            <Button
              color='grey'
              onClick={() => {
                setPredicate('final', 'false');
              }}
            >
              <Icon name='redo' />
            </Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>{predicate.get('begin')}</Table.Cell>
        <Table.Cell>{predicate.get('end')}</Table.Cell>
        <Table.Cell>{predicate.get('id')}</Table.Cell>
      </Table.Row>
    </Table>
  );
};

export default observer(IncomeSearch);
