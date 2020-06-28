import React, { useContext, useEffect } from 'react';
import { Table, Label, Image, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

const OrderProduct = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadOptions, productOptionsRegistry, productRegistry } = rootStore.orderOptions;
  const {
    selectedOrder: order,
    addProductOrder,
    setSelectedProduct,
    editable,
    quantity,
    setQuantity,
  } = rootStore.orderStore;

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  var total: number = 0;
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
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
                  setSelectedProduct(
                    productRegistry.get(data.options?.find((o) => o.value === data.value)!.key)
                  );
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
                />
              </div>
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button
                  color='green'
                  onClick={() => {
                    console.log(quantity);
                    addProductOrder();
                  }}
                >
                  <Icon name='plus' />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )}
        {order!.products.map((productsOrder, index) => (
          <Table.Row key={index} className='orderCell'>
            <Table.Cell>
              <Image size='small' src={productsOrder.product.image || '/assets/user.png'} />
              {productsOrder.product.name}
            </Table.Cell>
            <Table.Cell>{productsOrder.product.price}</Table.Cell>
            <Table.Cell>{productsOrder.quantity}</Table.Cell>
            <Table.Cell>
              {productsOrder.quantity * productsOrder.product.price}
              <div hidden>{(total += productsOrder.quantity * productsOrder.product.price)}</div>
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Button.Group>
                <Button as={Link} to={`/products/${productsOrder.product.id}`} color='blue'>
                  <Icon name='search plus' />
                </Button>
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
              <Button color='blue'>Submit</Button>
            ) : (
              <Button color='blue'>Export to file</Button>
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(OrderProduct);
