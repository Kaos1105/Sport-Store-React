import React, { useContext } from 'react';
import { Button, Label, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../app/models/product';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteProduct, submitting, targetDelete } = rootStore.productStore;
  return (
    //#region oldUI
    // <Segment.Group>
    //   <Segment>
    //     <Item.Group>
    //       <Item>
    //         <Item.Content>
    //           <Item.Header as={Link} to={`/products/${product.id}`}>
    //             {product.name}
    //           </Item.Header>
    //           <Button
    //             // onClick={() => selectActivity(activity.id)}
    //             as={Link}
    //             to={`/products/${product.id}`}
    //             floated='right'
    //             content='View'
    //             color='blue'
    //           />
    //           <Button
    //             name={product.id}
    //             {...console.log(targetDelete === product.id.toString() && submitting)}
    //             loading={targetDelete === product.id.toString() && submitting}
    //             onClick={(e) => deleteProduct(e, product.id)}
    //             floated='right'
    //             content='Delete'
    //             color='red'
    //           />
    //           <Item.Extra>
    //             <Label basic content={product.category}></Label>
    //           </Item.Extra>
    //         </Item.Content>
    //       </Item>
    //     </Item.Group>
    //   </Segment>
    //   <Segment.Group horizontal>
    //     <Segment.Group>
    //       <Segment>
    //         <Icon name='clock' />
    //         <span>Date added: {product.dateAdded}</span>
    //       </Segment>
    //       <Segment secondary>
    //         {' '}
    //         <Icon name='amazon' />
    //         <span>{product.brand}</span>
    //       </Segment>
    //       <Segment clearing>
    //         <Icon name='dollar sign' />
    //         <span>Import Price: {product.importPrice}</span>
    //         <Icon name='dollar sign' />
    //         <span>Price: {product.importPrice}</span>
    //       </Segment>
    //     </Segment.Group>
    //     <Segment>
    //       <Image src='/assets/Sport.png' size='small' centered />
    //     </Segment>
    //   </Segment.Group>
    // </Segment.Group>
    //#endregion oldUI
    <Table.Row key={product.id}>
      <Table.Cell>
        <Label color='green' key={product.id} size='large' as={Link} to={`/products/${product.id}`}>
          {product.name}
        </Label>
      </Table.Cell>
      <Table.Cell>{product.category}</Table.Cell>
      <Table.Cell>{product.brand}</Table.Cell>
      <Table.Cell textAlign='center'>
        <Button.Group>
          <Button
            // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/products/${product.id}`}
            content='View'
            color='blue'
          />
          <Button
            // onClick={() => selectActivity(activity.id)}
            as={Link}
            to={`/products/${product.id}/manage`}
            color='orange'
            content='Edit'
          />
          <Button
            name={product.id}
            loading={targetDelete === product.id.toString() && submitting}
            onClick={(e) => deleteProduct(e, product.id)}
            content='Delete'
            color='red'
          />
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default observer(ProductListItem);
