import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ProductFormValues } from '../../../app/models/product';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/sample/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  name: isRequired('Name'),
  category: isRequired('Category'),
  brand: isRequired('Brand'),
  price: isRequired('Price'),
  importPrice: isRequired('Import Price'),
  stock: isRequired('Stock'),
  date: isRequired('Date'),
});

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { createProduct, editProduct, submitting, loadActivity } = rootStore.productStore;

  const [product, setProduct] = useState(new ProductFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setProduct(new ProductFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTIme = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTIme;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createProduct(newActivity);
    } else {
      editProduct(activity);
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
                <Field name='name' placeholder='Name' value={product.name} component={TextInput} />
                <Field
                  name='category'
                  placeholder='Category'
                  value={product.category}
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths='equal'>
                  <Field
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={product.dateAdded}
                    //{...console.log(activity.date)}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name='stock'
                  placeholder='Stock'
                  value={product.stock}
                  component={NumberInput}
                />
                <Field
                  name='price'
                  placeholder='Price'
                  value={product.price}
                  component={NumberInput}
                />
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
