import React, { useContext } from 'react';
import { Button, Label, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { IImport } from '../../../app/models/import';

const ImportListItem: React.FC<{ importDTO: IImport; index: number }> = ({ importDTO, index }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteImport, submitting, targetDelete } = rootStore.importStore;

  const timeZone = 'Asia/Bangkok';
  return (
    <Table.Row key={index}>
      <Table.Cell>{importDTO.id}</Table.Cell>
      <Table.Cell>
        <Label color='green' key={importDTO.id} size='large' as={Link} to={`#`}>
          {importDTO.wholesalerName}
        </Label>
      </Table.Cell>
      <Table.Cell>{importDTO.wholesalerAddress}</Table.Cell>
      <Table.Cell>{importDTO.wholesalerPhone}</Table.Cell>
      <Table.Cell>
        {format(zonedTimeToUtc(importDTO.placementDate, timeZone), 'dd/MM/yyyy', {
          timeZone: timeZone,
        })}
      </Table.Cell>
      <Table.Cell>{importDTO.status}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/imports/${importDTO.id}`}
            color='blue'
          >
            <Icon name='search plus' />
          </Button>
          <Button // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/imports/${importDTO.id}/manage`}
            color='orange'
          >
            <Icon name='edit' />{' '}
          </Button>
          <Button
            name={importDTO.id}
            loading={targetDelete === importDTO.id.toString() && submitting}
            onClick={(e) => deleteImport(e, importDTO.id)}
            color='red'
          >
            <Icon name='trash alternate' />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ImportListItem);
