import React from 'react';
import { expect } from 'chai';
import { renderToString } from 'react-dom/server';

// SSR tests must be in separate module which does not import AngoliaPlaces into global scope
describe('AlgoliaPlaces', () => {
  describe('SSR', () => {
    let originalWindow;

    beforeAll(() => {
      originalWindow = global.window;
      delete global.window;
    });

    afterAll(() => {
      global.window = originalWindow;
    });

    it('should render successfully on server', () => {
      const placeholder = 'my place';
      /* eslint-disable global-require */
      const AlgoliaPlaces = require('./AlgoliaPlaces').default;
      const output = renderToString(<AlgoliaPlaces placeholder={placeholder} />);

      expect(output).to.match(/<input\s+type="text"/);
      expect(global).to.not.have.property('window');
    });
  });
});
