import React from 'react';
import PropTypes from 'prop-types';
import Places from 'places.js';

export default class AlgoliaPlaces extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onCursorChanged: PropTypes.func,
    onSuggestions: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onLimit: PropTypes.func,
    onError: PropTypes.func,
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
      countries: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
        if (propValue[key].length !== 2) {
          return new Error(`Invalid prop \`${propFullName}\` supplied to` +
            ` \`${componentName}\`. Validation failed.`);
        }
        return true;
      }),
      aroundLatLng: PropTypes.string,
      aroundLatLngViaIP: PropTypes.bool,
      aroundRadius: PropTypes.number,
      templates: PropTypes.object,
      style: PropTypes.bool,
      appId: PropTypes.string,
      apiKey: PropTypes.string,
      useDeviceLocation: PropTypes.bool,
      computeQueryParams: PropTypes.object,
      clientOptions: PropTypes.object,
      autocompleteOptions: PropTypes.object,
      insideBoundingBox: PropTypes.string,
      insidePolygon: PropTypes.string,
    }),
  };

  static defaultProps = {
    placeholder: 'Type an address',
    onCursorChanged: () => undefined,
    onSuggestions: () => undefined,
    onChange: () => undefined,
    onClear: () => undefined,
    onLimit: () => undefined,
    onError: () => undefined,
    options: {},
  };

  componentDidMount() {
    this.autocomplete = Places({
      ...this.props.options,
      container: this.autocompleteElem,
    });

    this.autocomplete.on('suggestions', this.props.onSuggestions);
    this.autocomplete.on('cursorchanged', this.props.onCursorChanged);
    this.autocomplete.on('change', this.props.onChange);
    this.autocomplete.on('clear', this.props.onClear);
    this.autocomplete.on('limit', this.props.onLimit);
    this.autocomplete.on('error', this.props.onError);
  }

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          type="text"
          ref={(ref) => { this.autocompleteElem = ref; }}
        />
      </div>
    );
  }
}
