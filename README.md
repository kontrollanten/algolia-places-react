# React wrapper for [Algolia Places](https://github.com/algolia/places) [![codecov](https://codecov.io/gh/kontrollanten/algolia-places-react/branch/master/graph/badge.svg)](https://codecov.io/gh/kontrollanten/algolia-places-react)[![Known Vulnerabilities](https://snyk.io/test/github/kontrollanten/algolia-places-react/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kontrollanten/algolia-places-react?targetFile=package.json)[![Build Status](https://travis-ci.org/kontrollanten/algolia-places-react.svg?branch=master)](https://travis-ci.org/kontrollanten/algolia-places-react)

Blazing fast address autocomplete React/preact component. :zap:

## Installation
```bash
npm install algolia-places-react --save
```
or
```bash
yarn add algolia-places-react
```


## Usage
```javascript
import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';

export default () => {
  return (
    <AlgoliaPlaces
      placeholder='Write an address here'

      onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
        console.log('Fired when suggestion selected in the dropdown or hint was validated.')}

      onSuggestions={({ rawAnswer, query, suggestions }) => 
        console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}

      onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
        console.log('Fired when arrows keys are used to navigate suggestions.')}

      onClear={() => 
        console.log('Fired when the input is cleared.')}

      onLimit={({ message }) => 
        console.log('Fired when you reached your current rate limit.')}

      onError={({ message }) => 
        console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
    />
  );  
}
```

Read more at [Algolia Places site](https://community.algolia.com/places/documentation.html)

## Todo
Implement support for using [Places methods](https://community.algolia.com/places/documentation.html#methods)
