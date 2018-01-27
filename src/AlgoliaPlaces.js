import React from 'react';
import PropTypes from 'prop-types';
import Places from 'places.js';

export default class AlgoliaPlaces extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    /* eslint-disable react/no-unused-prop-types */
    onCursorChanged: PropTypes.func,
    onSuggestions: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onLimit: PropTypes.func,
    onError: PropTypes.func,
    /* eslint-enable react/no-unused-prop-types */
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
    onCursorChanged: null,
    onSuggestions: null,
    onChange: null,
    onClear: null,
    onLimit: null,
    onError: null,
    options: {},
  };

  componentDidMount() {
    this.autocomplete = Places({
      ...this.props.options,
      container: this.autocompleteElem,
    });

    [
      'onSuggestions',
      'onCursorChanged',
      'onChange',
      'onClear',
      'onLimit',
      'onError',
    ]
      .filter(prop => !!this.props[prop])
      .map(prop => ({ prop, eventName: prop.substr(2).toLowerCase() }))
      .forEach(({ prop, eventName }) => {
        this.autocomplete.on(eventName, this.props[prop]);
      });
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
