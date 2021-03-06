import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import SelectInput from '../../../app/common/form/SelectInput';
import { OrShipmentFormValue } from '../../../app/models/shipment';
import { shipmentStatusOptions } from '../../../app/common/sample/shipmentStatusOptions';

const validate = combineValidators({
  orderID: isRequired('Order ID'),
  deliverDate: isRequired('Date'),
  shipmentStatus: isRequired('Status'),
  shipmentCompany: isRequired('Company'),
  shipmentID: isRequired('Shipment ID'),
});

interface DetailParams {
  id: string;
}

const OrderForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const timeZone = 'Asia/Bangkok';
  const rootStore = useContext(RootStoreContext);
  const { createShipment, editShipment, submitting, loadShipment } = rootStore.orderShipmentStore;
  const { loadOptions, orderIdRegistry } = rootStore.shipmentOptions;

  const [shipment, setShipment] = useState(new OrShipmentFormValue());
  const [loading, setLoading] = useState(false);

  var options = shipmentStatusOptions.filter((x) => x.value === shipmentStatusOptions[1].value);

  useEffect(() => {
    loadOptions();
    if (match.params.id) {
      setLoading(true);
      loadShipment(match.params.id)
        .then((shipment) => {
          let utcDate = zonedTimeToUtc(shipment.deliverDate, timeZone);
          let dateDelivery = utcToZonedTime(utcDate, timeZone);
          let result = new OrShipmentFormValue(shipment);
          result.deliverDate = dateDelivery;
          setShipment(new OrShipmentFormValue(result));
        })
        .finally(() => setLoading(false));
    }
  }, [loadShipment, match.params.id, loadOptions]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...shipment } = values;
    if (!shipment.id) {
      let newShipment = {
        ...shipment,
        id: '',
      };
      createShipment(newShipment);
    } else {
      editShipment(shipment);
    }
    //console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={shipment}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Label>Order ID</Label>
                {shipment.orderID === '' || shipment.orderID === null ? (
                  <Field
                    name='orderID'
                    placeholder='Order ID'
                    component={SelectInput}
                    options={orderIdRegistry}
                  />
                ) : (
                  <Field
                    name='orderID'
                    disabled={true}
                    placeholder='Order ID'
                    component={TextInput}
                    value={shipment.orderID}
                  />
                )}
                <Label>Shipment ID</Label>
                <Field
                  name='shipmentID'
                  placeholder='Shipment ID'
                  value={shipment.shipmentID}
                  component={TextInput}
                />
                <Label>Shipment Company</Label>
                <Field
                  name='shipmentCompany'
                  placeholder='Shipment Company'
                  value={shipment.shipmentCompany}
                  component={TextInput}
                />
                <Label>Status</Label>
                {shipment.shipmentStatus === shipmentStatusOptions[1].value && (
                  <Field
                    name='shipmentStatus'
                    placeholder='Status'
                    component={SelectInput}
                    options={shipmentStatusOptions}
                  />
                )}
                {shipment.shipmentStatus !== shipmentStatusOptions[1].value &&
                  shipment.shipmentStatus !== '' && (
                    <Field
                      name='shipmentStatus'
                      disabled={true}
                      placeholder='Status'
                      component={SelectInput}
                      options={shipmentStatusOptions}
                    />
                  )}
                {shipment.shipmentStatus === '' && (
                  <Field
                    name='shipmentStatus'
                    placeholder='Status'
                    component={SelectInput}
                    options={options}
                  />
                )}
                <Label>Delivery Date</Label>
                <Form.Group widths='equal'>
                  <Field
                    name='deliverDate'
                    date={true}
                    placeholder='Date'
                    value={shipment.deliverDate}
                    //{...console.log(activity.date)}
                    component={DateInput}
                  />
                </Form.Group>

                <Button
                  loading={submitting}
                  disabled={loading || invalid}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  disabled={loading}
                  onClick={
                    shipment.id
                      ? () => history.push(`/orderShipment/${shipment.id}`)
                      : () => history.push('/orderShipment')
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
