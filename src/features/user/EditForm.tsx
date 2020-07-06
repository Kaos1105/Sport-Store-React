import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { Button, Form, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
  userName: isRequired('New Username'),
  password: isRequired('Password'),
});

const EditForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateUser } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        updateUser(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='Change Username and Password' color='teal' textAlign='center' />
          <Field name='userName' component={TextInput} placeholder='New Username' />
          <Field name='password' component={TextInput} placeholder='New Password' type='password' />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text={`${submitError.status}: Invalid email or password`}
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Submit'
            fluid
          />
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    />
  );
};

export default EditForm;
