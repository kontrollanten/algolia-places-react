import React from 'react';
import PropTypes from 'prop-types';
import Places from 'places.js';

export default class AlgoliaPlaces extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      type: PropTypes.oneOf([
        'city',
        'country',
        'address',
        'busStop',
        'trainStation',
        'townhall',
        'airport',
      ]),
    }),
  };

  static defaultProps = {
    placeholder: 'Type an address',
    options: {},
  };

  componentDidMount() {
    this.autocomplete = Places({
      ...this.props.options,
      container: this.autocompleteElem,
    });
  }

  render() {
    return (
      <input
        placeholder={this.props.placeholder}
        type="text"
        ref={(ref) => { this.autocompleteElem = ref; }}
      />
    );
  }
}
