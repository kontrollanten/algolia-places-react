import React from 'react';
import PropTypes from 'proptypes';
import Places from 'places.js';

export default class AlgoliaPlaces extends React.Component {
  componentDidMount() {
    this.autocomplete = Places({
      container: this.autocompleteElem,
    });
  }

  render() {
    return (
      <input
        type="text"
        ref={(ref) => { this.autocompleteElem = ref; }}
      />
    );
  }
}
