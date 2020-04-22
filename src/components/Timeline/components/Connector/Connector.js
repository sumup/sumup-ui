/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { linearGradient, tint } from 'polished';

import { HORIZONTAL, VERTICAL, NEUTRAL, COLOR_MAP } from '../../constants';
import Node from '../Node';

const baseStyles = ({ theme }) => css`
  label: connector;
  flex: 1;
  margin: ${theme.spacings.byte};
`;

const horizontalStyles = ({ direction }) =>
  direction === HORIZONTAL &&
  css`
    label: connector--horizontal;
    height: 2px;
    min-width: 60px;
  `;

const verticalStyles = ({ direction }) =>
  direction === VERTICAL &&
  css`
    label: connector--vertical;
    width: 2px;
    min-height: 60px;
  `;

const colorStyles = ({ theme, direction, gradient, startType, endType }) => {
  const color = COLOR_MAP[NEUTRAL];

  if (!gradient) {
    return css`
      label: ${`connector--${direction}--plain`};
      background-color: ${tint(0.7, theme.colors[color])};
    `;
  }

  const startColor = COLOR_MAP[startType];
  const endColor = COLOR_MAP[endType];
  const toDirection = direction === HORIZONTAL ? 'to right' : 'to bottom';

  if (!startColor || !endColor) {
    return null;
  }

  return css`
    label: ${`connector--${direction}--gradient`};
    ${linearGradient({
      colorStops: [
        tint(0.7, theme.colors[startColor]),
        tint(0.7, theme.colors[endColor])
      ],
      toDirection,
      fallback: tint(0.7, theme.colors[color])
    })};
  `;
};

const StyledConnector = styled.div(
  baseStyles,
  horizontalStyles,
  verticalStyles,
  colorStyles
);

const Connector = props => <StyledConnector {...props} />;

Connector.HORIZONTAL = HORIZONTAL;
Connector.VERTICAL = VERTICAL;

Connector.propTypes = {
  /**
   * The direction of the connector - horizontal or vertical.
   */
  direction: PropTypes.oneOf([Connector.HORIZONTAL, Connector.VERTICAL])
    .isRequired,
  /**
   * Whether to use a gradient line or a plain one.
   */
  gradient: PropTypes.bool,
  /**
   * The type of the start node used to determine the start gradient color.
   */
  startType: PropTypes.oneOf([
    Node.NEUTRAL,
    Node.PRIMARY,
    Node.SUCCESS,
    Node.WARNING,
    Node.DANGER
  ]),
  /**
   * The type of the end node used to determine the end gradient color.
   */
  endType: PropTypes.oneOf([
    Node.NEUTRAL,
    Node.PRIMARY,
    Node.SUCCESS,
    Node.WARNING,
    Node.DANGER
  ])
};

Connector.defaultProps = {
  direction: VERTICAL,
  gradient: false,
  startType: NEUTRAL,
  endType: NEUTRAL
};

/**
 * @component
 */
export default Connector;
