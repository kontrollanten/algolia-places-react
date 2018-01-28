import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AlgoliaPlaces from './AlgoliaPlaces';

Enzyme.configure({ adapter: new Adapter() });

const waitUntil = (callback, errorMessage) => new Promise((resolve, reject) => {
  let count = 0;

  const interval = setInterval(() => {
    if (callback() === true) {
      resolve();
      clearInterval(interval);
    }

    if (count === 25) {
      reject(new Error(errorMessage || `Timed out after ${count} attempts`));
      clearInterval(interval);
    }

    count += 1;
  }, 100);
});

describe('AlgoliaPlaces', () => {
  describe('validation', () => {
    beforeAll(() => {
      sinon.stub(console, 'error');
      global.navigator.geolocation = {
        watchPosition: sinon.spy(),
      };
    });

    beforeEach(() => {
      console.error.reset();
    });

    afterAll(() => {
      console.error.restore();
    });

    it('should not log an error when options is empty', () => {
      mount(<AlgoliaPlaces options={{}} />);
      expect(console.error.calledOnce).to.equal(false);
    });

    it('should log an error when options.type is not valid', () => {
      mount(<AlgoliaPlaces options={{ type: 'invalid' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.type/);
    });

    it('should log an error when options.countries is not a string with length of 2', () => {
      mount(<AlgoliaPlaces options={{ countries: ['sve'] }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.countries/);
    });

    it('should accept when options.contries contains a string with length of 2', () => {
      mount(<AlgoliaPlaces options={{ countries: ['sv'] }} />);
      expect(console.error.calledOnce).to.equal(false);
    });

    it('should log an error when options.aroundLatLng is not a string', () => {
      mount(<AlgoliaPlaces options={{ aroundLatLng: [12, 12] }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.aroundLatLng/);
    });

    it('should log an error when options.aroundLatLngViaIP is not a boolean', () => {
      mount(<AlgoliaPlaces options={{ aroundLatLngViaIP: 'true' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.aroundLatLngViaIP/);
    });

    it('should log an error when options.aroundRadius is not a number', () => {
      mount(<AlgoliaPlaces options={{ aroundRadius: '1' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.aroundRadius/);
    });

    it('should log an error when options.templates is not an object', () => {
      mount(<AlgoliaPlaces options={{ templates: 'template' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.templates/);
    });

    it('should log an error when options.style is not an boolean', () => {
      mount(<AlgoliaPlaces options={{ style: '' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.style/);
    });

    it('should log an error when options.appId is not an string', () => {
      try {
        mount(<AlgoliaPlaces options={{ appId: [123123] }} />);
      } catch (e) {}

      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.appId/);
    });

    it('should log an error when options.apiKey is not an string', () => {
      try {
        mount(<AlgoliaPlaces options={{ apiKey: [123123] }} />);
      } catch (e) {}

      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.apiKey/);
    });

    it('should log an error when options.useDeviceLocation is not a boolean', () => {
      mount(<AlgoliaPlaces options={{ useDeviceLocation: 'false' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.useDeviceLocation/);
    });

    it('should log an error when options.computeQueryParams is not an object', () => {
      mount(<AlgoliaPlaces options={{ computeQueryParams: 'false' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.computeQueryParams/);
    });

    it('should log an error when options.clientOptions is not an object', () => {
      try {
        mount(<AlgoliaPlaces options={{ clientOptions: 'false' }} />);
      } catch (e) {}

      expect(console.error.firstCall.args[0]).to.match(/options.clientOptions/);
    });

    it('should log an error when options.autocompleteOptions is not an object', () => {
      mount(<AlgoliaPlaces options={{ autocompleteOptions: 'string' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.autocompleteOptions/);
    });

    it('should log an error when options.insideBoundingBox is not a string', () => {
      mount(<AlgoliaPlaces options={{ insideBoundingBox: ['string'] }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.insideBoundingBox/);
    });

    it('should log an error when options.insidePolygon is not a string', () => {
      mount(<AlgoliaPlaces options={{ insidePolygon: ['string'] }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.insidePolygon/);
    });
  });

  describe('events', () => {
    it('should call onSuggestions when suggestions is received', async () => {
      const onSuggestions = sinon.spy();
      const wrapper = mount(<AlgoliaPlaces onSuggestions={onSuggestions} />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));

      await waitUntil(() => onSuggestions.calledOnce);
      expect(onSuggestions.calledOnce).to.equal(true);
      const { suggestions } = onSuggestions.firstCall.args[0];
      expect(suggestions.length).to.equal(5);
    });

    it('should call onCursorChanged when arrowDown key is pressed', async () => {
      const onCursorChanged = sinon.spy();
      const onSuggestions = sinon.spy();
      const wrapper = mount(<AlgoliaPlaces
        onCursorChanged={onCursorChanged}
        onSuggestions={onSuggestions}
      />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));

      await waitUntil(() => onSuggestions.calledOnce, 'Waited for onSuggestion to have been called');
      const keyboardEvent = new KeyboardEvent('keydown', { which: 40 });
      wrapper.find('input').getDOMNode().dispatchEvent(keyboardEvent);

      await waitUntil(() => onCursorChanged.called, 'Waited for onCursorChanged to have been called.');

      expect(onCursorChanged.called).to.equal(true);
    });

    it('should call onChange when a suggestion is clicked', async () => {
      const onChange = sinon.spy();
      const onSuggestions = sinon.spy();
      const wrapper = mount(<AlgoliaPlaces
        onChange={onChange}
        onSuggestions={onSuggestions}
      />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));

      await waitUntil(() => onSuggestions.calledOnce, 'Waited for onSuggestion to have been called');
      await waitUntil(() => wrapper.getDOMNode().querySelectorAll('.ap-suggestion').length > 0, 'Waited for suggestions');

      wrapper.getDOMNode().querySelector('.ap-suggestion').dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

      await waitUntil(() => onChange.called, 'Waited for onChange to have been called.');

      const { suggestion, suggestionIndex } = onChange.firstCall.args[0];

      expect(onChange.calledOnce).to.equal(true);
      expect(suggestion === undefined).to.equal(false);
      expect(suggestionIndex).to.equal(0);
    });

    xit('should call onClear when the input field gets empty', async () => {
      const onClear = sinon.spy();
      const onChange = sinon.spy();
      const onSuggestions = sinon.spy();

      const wrapper = mount(<AlgoliaPlaces
        onChange={onChange}
        onSuggestions={onSuggestions}
        onClear={onClear}
      />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));
      await waitUntil(() => onSuggestions.calledOnce, 'Waited for onSuggestion to have been called');

      wrapper.find('input').getDOMNode().value = '';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));

      expect(onClear.calledOnce).to.equal(true);
    });

    it('should call onLimit when HTTP request to Algolia returns 489', async () => {
      const onLimit = sinon.spy();

      const fakeXhr = sinon.useFakeXMLHttpRequest();
      let suggestionRequest;
      fakeXhr.onCreate = (xhr) => { suggestionRequest = xhr; };

      const wrapper = mount(<AlgoliaPlaces
        onLimit={onLimit}
      />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));
      suggestionRequest.respond(429, {}, JSON.stringify({}));

      await waitUntil(() => onLimit.called);

      expect(onLimit.calledOnce).to.equal(true);
      expect(typeof onLimit.firstCall.args[0].message).to.equal('string');
    });

    it('should call onError when HTTP request returns bad status code', async () => {
      const onError = sinon.spy();

      const fakeXhr = sinon.useFakeXMLHttpRequest();
      let suggestionRequest;
      fakeXhr.onCreate = (xhr) => { suggestionRequest = xhr; };

      const wrapper = mount(<AlgoliaPlaces
        onError={onError}
      />);

      wrapper.find('input').instance().value = 'Huddinge';
      wrapper.find('input').getDOMNode().dispatchEvent(new Event('input'));
      suggestionRequest.respond(404, {}, JSON.stringify({}));

      await waitUntil(() => onError.called);

      expect(onError.calledOnce).to.equal(true);
      expect(typeof onError.firstCall.args[0].message).to.equal('string');
    });
  });

  it('should only mount once', () => {
    sinon.spy(AlgoliaPlaces.prototype, 'componentDidMount');
    mount(<AlgoliaPlaces />);

    expect(AlgoliaPlaces.prototype.componentDidMount.callCount).to.equal(1);
  });

  it('should display default placeholder', () => {
    const wrapper = mount(<AlgoliaPlaces />);

    expect(wrapper.find('input').prop('placeholder')).to.equal('Type an address');
  });

  it('should display provided placeholder', () => {
    const placeholder = 'custom placeholder';
    const wrapper = mount(<AlgoliaPlaces placeholder={placeholder} />);

    expect(wrapper.find('input').prop('placeholder')).to.equal(placeholder);
  });
});
