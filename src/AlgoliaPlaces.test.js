import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AlgoliaPlaces from './AlgoliaPlaces';

Enzyme.configure({ adapter: new Adapter() });

describe('AlgoliaPlaces', () => {
  describe('validation', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });

    it('should log an error when options.type is not valid', () => {
      mount(<AlgoliaPlaces options={{ type: 'invalid' }} />);
      expect(console.error.calledOnce).to.equal(true);
      expect(console.error.firstCall.args[0]).to.match(/options.type/);
    });
  });

  it('should only mount once', () => {
    sinon.spy(AlgoliaPlaces.prototype, 'componentDidMount');
    mount(<AlgoliaPlaces />);

    expect(AlgoliaPlaces.prototype.componentDidMount.callCount).to.equal(1);
  });

  it('should display default placeholder', () => {
    const context = mount(<AlgoliaPlaces />);

    expect(context.find('input').prop('placeholder')).to.equal('Type an address');
  });

  it('should display provided placeholder', () => {
    const placeholder = 'custom placeholder';
    const context = mount(<AlgoliaPlaces placeholder={placeholder} />);

    expect(context.find('input').prop('placeholder')).to.equal(placeholder);
  });
});
