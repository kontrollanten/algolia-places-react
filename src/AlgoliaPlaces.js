import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable global-require */
const Places = (typeof window !== 'undefined') && require('places.js');

export default class AlgoliaPlaces extends React.Component {
  static propTypes = {
    /** Placeholder for input field. */
    placeholder: PropTypes.string,
    /** Reference setter for Places object. */
    placesRef: PropTypes.func,
    /* eslint-disable react/no-unused-prop-types */
    /** https://community.algolia.com/places/documentation.html#api-events-cursorchanged */
    onCursorChanged: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#api-events-suggestions */
    onSuggestions: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#api-events-change */
    onChange: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#api-events-clear */
    onClear: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#api-events-limit */
    onLimit: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#api-events-error */
    onError: PropTypes.func,
    /** https://community.algolia.com/places/documentation.html#options */
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
          return new Error(`Invalid prop \`${propFullName}\` supplied to`
            + ` \`${componentName}\`. Validation failed.`);
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
    placesRef: null,
    onCursorChanged: null,
    onSuggestions: null,
    onChange: null,
    onClear: null,
    onLimit: null,
    onError: null,
    options: {},
  };

  componentDidMount() {
    if (!Places) return;

    this.autocomplete = Places({
      ...this.props.options,
      container: this.autocompleteElem,
    });
    if (this.props.placesRef) this.props.placesRef(this.autocomplete);

    this.autocompleteListeners = [
      'onSuggestions',
      'onCursorChanged',
      'onChange',
      'onClear',
      'onLimit',
      'onError',
    ]
      .filter(prop => !!this.props[prop])
      .map(prop => ({ prop, eventName: prop.substr(2).toLowerCase() }));

    this.autocompleteListeners
      .forEach(({ prop, eventName }) => this.autocomplete.on(eventName, this.props[prop]));
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.autocomplete) {
      this.autocompleteListeners
        .forEach(({ eventName }) => this.autocomplete.removeAllListeners(eventName));
    }
  }

  render() {
    const {
      onChange,
      onClear,
      onCursorChanged,
      onError,
      onLimit,
      onSuggestions,
      options,
      placesRef,
      ...inputProps
    } = this.props;

    return (
      <div>
        <input
          type="text"
          aria-label={this.props.placeholder}
          ref={(ref) => { this.autocompleteElem = ref; }}
          {...inputProps}
        />
      </div>
    );
  }
}
