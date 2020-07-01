import React from 'react';
import PropTypes from 'prop-types';
import AlgoliaPlaces from '../src';

const Autocomplete = ({ onCallback }) => {
  const handleChange = (data) => {
    onCallback({
      name: 'onChange',
      args: data,
    });
    console.log('Fired when suggestion selected in the dropdown or hint was validated.');
  };

  const handleSuggestions = (data) => {
    onCallback({
      name: 'onSuggestions',
      args: data,
    });
    console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.');
  };

  const handleCursorChanged = (data) => {
    onCallback({
      name: 'onCursorChanged',
      args: data,
    });
    console.log('Fired when arrows keys are used to navigate suggestions.');
  };

  const handleClear = () => {
    onCallback({
      name: 'onClear',
      args: null,
    });
    console.log('Fired when the input is cleared.');
  };

  const handleLocate = (data) => {
    onCallback({
      name: 'onLocate',
      args: data,
    });
    console.log('Fired when pin icon is clicked.');
  };

  const handleLimit = (data) => {
    onCallback({
      name: 'onLimit',
      args: data,
    });
    console.log('Fired when you reached your current rate limit.');
  };

  const handleError = (data) => {
    onCallback({
      name: 'onError',
      args: data,
    });
    console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.');
  };

  const handleFocus = (data) => {
    onCallback({
      name: 'onFocus',
      args: data,
    });
  };

  return (
    <AlgoliaPlaces
      placeholder="Write an address here"
      onChange={handleChange}
      onFocus={handleFocus}
      onSuggestions={handleSuggestions}
      onCursorChanged={handleCursorChanged}
      onClear={handleClear}
      onLocate={handleLocate}
      onLimit={handleLimit}
      onError={handleError}
    />
  );
};

Autocomplete.propTypes = {
  onCallback: PropTypes.func.isRequired,
};

export default Autocomplete;
