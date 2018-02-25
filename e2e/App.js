import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Provider,
  Subhead,
} from 'rebass';
import Markdown from 'react-markdown';
import FiredCallbacks from './FiredCallbacks';
import Autocomplete from './Autocomplete';

export default class App extends React.Component {
  constructor() {
    super();

    this.addFiredCallback = this.addFiredCallback.bind(this);
  }

  state = {
    firedCallbacks: [],
  };

  addFiredCallback({ name, args }) {
    this.setState({
      firedCallbacks: [
        {
          name,
          args,
        },
        ...this.state.firedCallbacks,
      ],
    });
  }

  render() {
    return (
      <Provider>
        <a href="https://github.com/kontrollanten/algolia-places-react"><img
          style={{
            position: 'absolute', top: 0, right: 0, border: 0,
          }}
          src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
          alt="Fork me on GitHub"
          data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
        />
        </a>
        <Heading pb={40}>Algolia Places React component in action</Heading>
        <Flex mx={-2}>
          <Box width={1 / 3} px={2}>
            <Subhead>UI:</Subhead>
            <Autocomplete onCallback={this.addFiredCallback} />
            <Markdown
              source={`
\`\`\`js
  <AlgoliaPlaces
    placeholder='Write an address here'
    onChange={this.handleChange}
    onSuggestions={this.handleSuggestions}
    onCursorChanged={this.handleCursorChanged}
    onClear={this.handleClear}
    onLimit={this.handleLimit}
    onError={this.handleError}
  />
  \`\`\``
              }
            />

            <Link href="https://github.com/kontrollanten/algolia-places-react" target="_blank">
      Further documentation at GitHub
            </Link>

          </Box>
          <Box width={2 / 3} px={2}>
            <FiredCallbacks callbacks={this.state.firedCallbacks} />
          </Box>
        </Flex>
      </Provider>
    );
  }
}
