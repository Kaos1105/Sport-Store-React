import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineValidators, isRequired, composeValidators, isNumeric } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { OrderFormValues } from '../../../app/models/order';

const validate = combineValidators({
  recipientName: isRequired('Name'),
  recipientAddress: isRequired('Address'),
  recipientPhone: composeValidators(isRequired('Phone'), isNumeric('Phone'))(),
  placementDate: isRequired('Date'),
});

interface DetailParams {
  id: string;
}

const OrderForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const timeZone = 'Asia/Bangkok';
  const rootStore = useContext(RootStoreContext);
  const { createOrder, editOrder, submitting, loadOrder } = rootStore.orderStore;

  const [order, setOrder] = useState(new OrderFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadOrder(match.params.id)
        .then((order) => {
          let utcDate = zonedTimeToUtc(order.placementDate, timeZone);
          let dateAdded = utcToZonedTime(utcDate, timeZone);
          let result = new OrderFormValues(order);
          result.placementDate = dateAdded;
          setOrder(new OrderFormValues(result));
        })
        .finally(() => setLoading(false));
    }
  }, [loadOrder, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...order } = values;
    if (!order.id) {
      let newOrder = {
        ...order,
        id: '',
      };
      createOrder(newOrder);
    } else {
      editOrder(order);
    }
    //console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={order}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Label>Name</Label>
                <Field
                  name='recipientName'
                  placeholder='Name'
                  value={order.recipientName}
                  component={TextInput}
                />
                <Label>Category</Label>
                <Field
                  name='recipientAddress'
                  placeholder='Address'
                  value={order.recipientAddress}
                  component={TextInput}
                />
                <Label>Placement Date</Label>
                <Form.Group widths='equal'>
                  <Field
                    name='placementDate'
                    date={true}
                    placeholder='Date'
                    value={order.placementDate}
                    //{...console.log(activity.date)}
                    component={DateInput}
                  />
                </Form.Group>
                <Label>Phone</Label>
                <Field
                  name='recipientPhone'
                  placeholder='Phone'
                  value={parseInt(order.recipientPhone)}
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
                    order.id
                      ? () => history.push(`/orders/${order.id}`)
                      : () => history.push('/orders')
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

export default observer(OrderForm);
