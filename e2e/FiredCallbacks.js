import React from 'react';
import PropTypes from 'prop-types';
import JsonView from 'react-json-view';
import { Subhead, Panel } from 'rebass';

const FiredCallbacks = ({ callbacks }) => (
  <div>
    <Subhead>Fired callbacks:</Subhead>
    {callbacks
      .map((cb, index, arr) => (
        <Panel
          color="blue"
          key={(arr.length - index).toString()}
          mt={20}
        >
          <Panel.Header
            bg="blue"
            color="white"
          >
            {cb.name}
          </Panel.Header>
          {cb.args && <JsonView
            src={cb.args}
            collapsed={1}
            name={false}
            enableClipboard={false}
          />}
        </Panel>
      ))}
  </div>
);

FiredCallbacks.propTypes = {
  callbacks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FiredCallbacks;
