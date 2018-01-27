import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Places from 'places.js';

const mockPlaces = jest.genMockFromModule('places.js');
const spyPlaces = sinon.spy(Places);

import AlgoliaPlaces from './AlgoliaPlaces';

Enzyme.configure({ adapter: new Adapter() });

describe('AlgoliaPlaces', () => {
  it('should only mount once', () => {
    sinon.spy(AlgoliaPlaces.prototype, 'componentDidMount');
    const context = mount(<AlgoliaPlaces />);

    expect(AlgoliaPlaces.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should pass options prop to Place.js constructor', () => {
    mount(<AlgoliaPlaces />);
    console.log(spyPlaces);
    expect(spyPlaces.called).to.equal(true);
  });
});
