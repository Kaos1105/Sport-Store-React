import React from 'react';
import { AxiosResponse } from 'axios';
import { Message } from 'semantic-ui-react';
import status from 'statuses';
import parse from 'html-react-parser';

interface IProps {
  error: AxiosResponse;
  text: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  //const statusText=error.message;
  return (
    <Message error>
      <Message.Header>{status(error.status)}</Message.Header>
      {/* {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List>
          {Object.values(error.data.errors)
            .flat()
            .map((err, index) => (
              <Message.Item key={index}> {err} </Message.Item>
            ))}
        </Message.List>
      )} */}
      {error.data && parse(`<div>${error.data}</div>`)}
      {!error.data && text && <Message color='yellow' content={text} />}
    </Message>
  );
};

export default ErrorMessage;
