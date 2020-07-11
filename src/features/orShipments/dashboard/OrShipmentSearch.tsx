import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Table, Button, Icon, Dropdown } from 'semantic-ui-react';
import React from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { DateTimePicker } from 'react-widgets';
import { shipmentStatusOptions } from '../../../app/common/sample/shipmentStatusOptions';

interface IProps {}

const OrShipmentSearch: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, loadFilters } = rootStore.orderShipmentStore;

  return (
    <Table.Row key='searchRow'>
      <Table.Cell></Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='orderIDSearch'
            placeholder='Order ID...'
            onBlur={(e) => {
              setPredicate('orderID', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='shipmentIDSearch'
            placeholder='Shipment ID...'
            onBlur={(e) => {
              setPredicate('shipmentID', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className='ui input'>
          <input
            key='companySearch'
            placeholder='Company...'
            onBlur={(e) => {
              setPredicate('shipmentCompany', e.target.value);
            }}
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <Dropdown
          fluid={false}
          placeholder='Select Status'
          search
          selection
          onChange={(e, data) => {
            setPredicate('shipmentStatus', data.value!.toString());
          }}
          options={shipmentStatusOptions}
        />
      </Table.Cell>
      <Table.Cell>
        <DateTimePicker
          format='dd/MM/yyyy'
          time={false}
          onChange={(date, dateString) => {
            let dateParam = date?.toISOString().split('T')[0];
            //dateString = dateString?.replace(/\//g, '-');
            console.log(date?.toISOString() + '--' + dateParam);
            setPredicate('deliverDate', dateParam!);
          }}
        />
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button color='green' onClick={() => loadFilters(false)}>
            <Icon name='search' />
          </Button>
          <Button color='grey' onClick={() => loadFilters(true)}>
            <Icon name='redo' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(OrShipmentSearch);
