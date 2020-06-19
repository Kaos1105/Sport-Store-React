import React from 'react';
import { Placeholder, Segment, Grid } from 'semantic-ui-react';

const ProductDetailInfoPlaceholder = () => (
  <Segment.Group>
    <Segment>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
    <Segment>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
    <Segment>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
    <Segment>
      <Grid>
        {' '}
        <Grid.Column width={3}>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image />
          </Placeholder>
        </Grid.Column>
        <Grid.Column width={3}>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image />
          </Placeholder>
        </Grid.Column>
        <Grid.Column width={3}>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image />
          </Placeholder>
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>
);

export default ProductDetailInfoPlaceholder;
