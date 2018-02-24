import React from 'react';
import { 
  Box,
	Code, 
  Flex,
	Heading, 
  Panel,
	Provider, 
	Subhead,
} from 'rebass';
import JsonView from 'react-json-view';
import Markdown from 'react-markdown';
import AlgoliaPlaces from '../src';

export default class App extends React.Component {
	state = {
		firedCallbacks: [],
	};

	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSuggestions = this.handleSuggestions.bind(this);
		this.handleCursorChanged = this.handleCursorChanged.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleLimit = this.handleLimit.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	handleChange(data) {
		this.addFiredCallback({
			name: 'onChange', 
			args: data,
		});
		console.log('Fired when suggestion selected in the dropdown or hint was validated.');
	}

	handleSuggestions(data) {
		this.addFiredCallback({
			name: 'onSuggestions', 
			args: data,
		});
		console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.');
	}

	handleCursorChanged(data){
		this.addFiredCallback({
			name: 'onCursorChanged', 
			args: data,
		});
		console.log('Fired when arrows keys are used to navigate suggestions.');
	}

	handleClear() {
		this.addFiredCallback({
			name: 'onClear', 
			args: null,
		});
		console.log('Fired when the input is cleared.');
	}

	handleLimit(data) {
		this.addFiredCallback({
			name: 'onLimit', 
			args: data,
		});
		console.log('Fired when you reached your current rate limit.');
	}

	handleError(data) {
		this.addFiredCallback({
			name: 'onError', 
			args: data,
		});
		console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.');
	}

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
        <Heading pb={40}>Algolia Places React component in action</Heading>
				<Flex mx={-2}>
					<Box width={1/3} px={2}>
						<Subhead>UI:</Subhead>
						<AlgoliaPlaces
							placeholder='Write an address here'
							onChange={this.handleChange}
							onSuggestions={this.handleSuggestions}
							onCursorChanged={this.handleCursorChanged}
							onClear={this.handleClear}
							onLimit={this.handleLimit}
							onError={this.handleError}
						/>

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
					</Box>
					<Box width={2/3} px={2}>
						<Subhead>Fired callbacks:</Subhead>
							{this.state.firedCallbacks
								.map((cb, index, arr) => (
									<Panel 
                    color="blue"
                    key={(arr.length - index).toString()}
                    mt={20}
                    >
										<Panel.Header 
                      bg="blue"
                      color="white">
                        {cb.name}
                    </Panel.Header>
										<JsonView
											src={cb.args}
                      collapsed={1}
                      name={false}
                      enableClipboard={false}
										/>
									</Panel>
								))}
					</Box>
				</Flex>
			</Provider>
		);
	}
}
