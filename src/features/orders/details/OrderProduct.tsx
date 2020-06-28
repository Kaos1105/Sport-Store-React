import React, { useContext } from 'react';
import { Table, Label, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IOrder } from '../../../app/models/order';

const OrderProduct: React.FC<{ order: IOrder }> = ({ order }) => {
  const rootStore = useContext(RootStoreContext);
  var total: number = 0;
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Product</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {order!.products.map((productsOrder, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Image size='tiny' src={productsOrder.product.image || '/assets/user.png'} />
              {productsOrder.product.name}
            </Table.Cell>
            <Table.Cell>{productsOrder.product.price}</Table.Cell>
            <Table.Cell>{productsOrder.quantity}</Table.Cell>
            <Table.Cell>
              {productsOrder.quantity * productsOrder.product.price}
              <div hidden>{(total += productsOrder.quantity * productsOrder.product.price)}</div>
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
            <Label color='blue'>{total}</Label>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default OrderProduct;
