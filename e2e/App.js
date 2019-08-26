import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
} from 'rebass';
import { ThemeProvider } from 'styled-components';
import Markdown from 'react-markdown';
import FiredCallbacks from './FiredCallbacks';
import Autocomplete from './Autocomplete';

export default class App extends React.Component {
  constructor() {
    super();

    this.addFiredCallback = this.addFiredCallback.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  state = {
    enabled: true,
    firedCallbacks: [],
  };

  handleReset() {
    this.setState({
      enabled: false,
      firedCallbacks: [],
    }, () => {
      setTimeout(() => {
        this.setState({
          enabled: true,
        });
      }, 100);
    });
  }

  addFiredCallback({ name, args }) {
    this.setState((state) => ({
      firedCallbacks: [
        {
          name,
          args,
        },
        ...state.firedCallbacks,
      ],
    }));
  }

  render() {
    return (
      <ThemeProvider theme={{ main: 'mediumseagreen' }}>
        <>
          <a href="https://github.com/kontrollanten/algolia-places-react">
            <img
              style={{
                position: 'absolute', top: 0, right: 0, border: 0,
              }}
              src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
              alt="Fork me on GitHub"
              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
            />
          </a>
          <Heading pb={40}>Algolia Places React component in action</Heading>

          <Button onClick={this.handleReset} mb={20}>Reset</Button>

          <Flex mx={-2}>
            <Box width={1 / 3} px={2}>
              <Heading fontSize={3} style={{ marginBottom: '10px' }}>UI</Heading>
              {this.state.enabled && <Autocomplete onCallback={this.addFiredCallback} />}
              <Markdown
                source={`
\`\`\`js
  <AlgoliaPlaces
    placeholder='Write an address here'
    onChange={this.handleChange}
    onClear={this.handleClear}
    onCursorChanged={this.handleCursorChanged}
    onError={this.handleError}
    onFocus={this.handleFocus}
    onLimit={this.handleLimit}
    onSuggestions={this.handleSuggestions}
  />
  \`\`\``}
              />

              <Link href="/api">
      Read API documentation here
              </Link>

            </Box>
            <Box width={2 / 3} px={2}>
              <FiredCallbacks callbacks={this.state.firedCallbacks} />
            </Box>
          </Flex>
        </>
      </ThemeProvider>
    );
  }
}
