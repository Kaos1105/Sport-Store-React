import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { Button, Form, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import SelectInput from '../../app/common/form/SelectInput';
import { roleOptions } from '../../app/common/sample/roleOptions';

const validate = combineValidators({
  userName: isRequired('Username'),
  email: isRequired('Email'),
  password: isRequired('Password'),
  role: isRequired('Role'),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
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
          <Header as='h2' content='Sign up to SportsStore' color='teal' textAlign='center' />
          <Field name='userName' component={TextInput} placeholder='UserName' />
          <Field name='role' placeholder='Role' component={SelectInput} options={roleOptions} />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field name='password' component={TextInput} placeholder='Password' type='password' />
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
            content='Register'
            fluid
          />
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    />
  );
};

export default RegisterForm;
