import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, Label } from 'semantic-ui-react';
import { ProductFormValues } from '../../../app/models/product';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineValidators, isRequired, composeValidators, isNumeric } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const validate = combineValidators({
  name: isRequired('Name'),
  category: isRequired('Category'),
  brand: isRequired('Brand'),
  price: composeValidators(isRequired('Price'), isNumeric('Price'))(),
  importPrice: composeValidators(isRequired('ImportPrice'), isNumeric('ImportPrice'))(),
  stock: composeValidators(isRequired('Stock'), isNumeric('Stock'))(),
  dateAdded: isRequired('Date'),
});

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const timeZone = 'Asia/Bangkok';
  const rootStore = useContext(RootStoreContext);
  const { createProduct, editProduct, submitting, loadProduct } = rootStore.productStore;

  const [product, setProduct] = useState(new ProductFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadProduct(match.params.id)
        .then((product) => {
          let utcDate = zonedTimeToUtc(product.dateAdded, timeZone);
          let dateAdded = utcToZonedTime(utcDate, timeZone);
          let result = new ProductFormValues(product);
          result.dateAdded = dateAdded;
          setProduct(new ProductFormValues(result));
        })
        .finally(() => setLoading(false));
    }
  }, [loadProduct, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...product } = values;
    if (!product.id) {
      let newProduct = {
        ...product,
        id: '',
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
    //console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={product}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Label>Name</Label>
                <Field name='name' placeholder='Name' value={product.name} component={TextInput} />
                <Label>Category</Label>
                <Field
                  name='category'
                  placeholder='Category'
                  value={product.category}
                  component={TextInput}
                />
                <Label>Brand</Label>
                <Field
                  name='brand'
                  placeholder='Brand'
                  value={product.brand}
                  component={TextInput}
                />
                <Label>Date Aded</Label>
                <Form.Group widths='equal'>
                  <Field
                    name='dateAdded'
                    date={true}
                    placeholder='Date Added'
                    value={product.dateAdded}
                    //{...console.log(activity.date)}
                    component={DateInput}
                  />
                </Form.Group>
                <Label>Stock</Label>
                <Field
                  name='stock'
                  placeholder='Stock'
                  value={product.stock}
                  component={NumberInput}
                />
                <Label>Price</Label>
                <Field
                  name='price'
                  placeholder='Price'
                  value={product.price}
                  component={NumberInput}
                />
                <Label>Import Price</Label>
                <Field
                  name='importPrice'
                  placeholder='Import Price'
                  value={product.importPrice}
                  component={NumberInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || pristine || invalid}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  disabled={loading}
                  onClick={
                    product.id
                      ? () => history.push(`/products/${product.id}`)
                      : () => history.push('/products')
                  }
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductForm);
