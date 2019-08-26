import React from 'react';
import PropTypes from 'prop-types';
import JsonView from 'react-json-view';
import { Heading } from 'rebass';
import styled from 'styled-components';

const PanelHeader = styled.div`
  background: blue;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #fff;
  margin-top: 10px;
  padding: 10px;
`;

const FiredCallbacks = ({ callbacks }) => (
  <>
    <Heading fontSize={3}>Fired callbacks:</Heading>
    {callbacks
      .map((cb, index, arr) => (
        <div
          color="blue"
          key={(arr.length - index).toString()}
          mt={20}
        >
          <PanelHeader
            bg="blue"
            color="white"
          >
            {cb.name}
          </PanelHeader>
          {cb.args && (
            <JsonView
              src={cb.args}
              collapsed={1}
              name={false}
              enableClipboard={false}
            />
          )}
        </div>
      ))}
  </>
);

FiredCallbacks.propTypes = {
  callbacks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FiredCallbacks;
