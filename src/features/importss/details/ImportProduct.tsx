import React, { useContext, useEffect } from 'react';
import { Table, Label, Image, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import TableToExcel from '../../../app/common/exportTable/TableToExcel';

const ImportProduct = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadOptions, productOptionsRegistry, productRegistry } = rootStore.orderOptions;
  const {
    selectedImport: importDTO,
    addProductImport,
    setSelectedProduct,
    editable,
    setQuantity,
    removeProductImport,
    editImport,
    submitting,
  } = rootStore.importStore;
  const history = createBrowserHistory();

  const tableId = 'importTable';

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  var total: number = 0;
  return (
    <Table celled id={tableId}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Import Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {editable && (
          <Table.Row>
            <Table.Cell>
              <Dropdown
                fluid={false}
                placeholder='Select product'
                search
                selection
                onChange={(e, data) => {
                  setSelectedProduct(productRegistry.get(data.value));
                }}
                options={productOptionsRegistry}
              />
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <div className='ui input'>
                <input
                  key='quantity'
                  placeholder='Quantity...'
                  type='number'
                  onBlur={(e) => {
                    if (!e.target.value) {
                      toast.error('Quantity is not valid');
                      setQuantity(0);
                    } else setQuantity(parseInt(e.target.value));
                  }}
                  min='1'
                />
              </div>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button
                  color='green'
                  onClick={() => {
                    addProductImport();
                  }}
                >
                  <Icon name='plus' />
                </Button>
                <Button
                  color='red'
                  onClick={() => {
                    removeProductImport();
                  }}
                >
                  <Icon name='trash' />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )}
        {importDTO!.products.map((productsImport, index) => (
          <Table.Row key={index} className='orderCell'>
            <Table.Cell>
              <Image size='small' src={productsImport.product.image || '/assets/user.png'} />
              {productsImport.product.name}
            </Table.Cell>
            <Table.Cell>{productsImport.product.importPrice}</Table.Cell>
            <Table.Cell>{productsImport.quantity}</Table.Cell>
            <Table.Cell>{productsImport.quantity * productsImport.product.importPrice}</Table.Cell>
            <Table.Cell textAlign='center'>
              <Button.Group>
                <Button as={Link} to={`/products/${productsImport.product.id}`} color='blue'>
                  <Icon name='search plus' />
                </Button>
                <div hidden>
                  {(total += productsImport.quantity * productsImport.product.importPrice)}
                </div>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Label color='teal' ribbon>
              Sum:
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Label color='olive'>{total}</Label>
          </Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>
            {editable ? (
              <Button
                loading={submitting}
                color='blue'
                onClick={() => {
                  editImport(importDTO!).then(() => history.go(0));
                }}
              >
                Submit
              </Button>
            ) : (
              <TableToExcel table={tableId} />
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(ImportProduct);
