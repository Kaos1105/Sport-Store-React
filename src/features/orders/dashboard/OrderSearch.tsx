import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { DateTimePicker } from 'react-widgets';

interface IProps {}

const OrderSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.orderStore;

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
        <div className='ui input'>
          <input
            key='addressSearch'
            placeholder='Address...'
            onBlur={(e) => {
              setPredicate('address', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='numberSearch'
            placeholder='PhoneNumber...'
            type='number'
            onBlur={(e) => {
              setPredicate('phone', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <DateTimePicker
          format='dd/MM/yyyy'
          time={false}
          onChange={(date, dateString) => {
            let dateParam = date?.toISOString().split('T')[0];
            //dateString = dateString?.replace(/\//g, '-');
            console.log(date?.toISOString() + '--' + dateParam);
            setPredicate('date', dateParam!);
          }}
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
  );
};

export default observer(OrderSearch);
