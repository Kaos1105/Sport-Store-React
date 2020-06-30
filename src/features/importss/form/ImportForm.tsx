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
import { ImportFormValues } from '../../../app/models/import';

const validate = combineValidators({
  wholesalerName: isRequired('Name'),
  wholesalerAddress: isRequired('Address'),
  wholesalerPhone: composeValidators(isRequired('Phone'), isNumeric('Phone'))(),
  placementDate: isRequired('Date'),
});

interface DetailParams {
  id: string;
}

const ImportForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const timeZone = 'Asia/Bangkok';
  const rootStore = useContext(RootStoreContext);
  const { createImport, editImport, submitting, loadImport } = rootStore.importStore;

  const [importDTO, setImport] = useState(new ImportFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadImport(match.params.id)
        .then((importDTO) => {
          let utcDate = zonedTimeToUtc(importDTO.placementDate, timeZone);
          let dateAdded = utcToZonedTime(utcDate, timeZone);
          let result = new ImportFormValues(importDTO);
          result.placementDate = dateAdded;
          setImport(new ImportFormValues(result));
        })
        .finally(() => setLoading(false));
    }
  }, [loadImport, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...importDTO } = values;
    if (!importDTO.id) {
      let newImport = {
        ...importDTO,
        id: '',
      };
      createImport(newImport);
    } else {
      editImport(importDTO);
    }
    //console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={importDTO}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Label>Name</Label>
                <Field
                  name='wholesalerName'
                  placeholder='Name'
                  value={importDTO.wholesalerName}
                  component={TextInput}
                />
                <Label>Address</Label>
                <Field
                  name='wholesalerAddress'
                  placeholder='Address'
                  value={importDTO.wholesalerAddress}
                  component={TextInput}
                />
                <Label>Placement Date</Label>
                <Form.Group widths='equal'>
                  <Field
                    name='placementDate'
                    date={true}
                    placeholder='Date'
                    value={importDTO.placementDate}
                    //{...console.log(activity.date)}
                    component={DateInput}
                  />
                </Form.Group>
                <Label>Phone</Label>
                <Field
                  name='wholesalerPhone'
                  placeholder='Phone'
                  value={parseInt(importDTO.wholesalerPhone)}
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
                    importDTO.id
                      ? () => history.push(`/imports/${importDTO.id}`)
                      : () => history.push('/imports')
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

export default observer(ImportForm);
