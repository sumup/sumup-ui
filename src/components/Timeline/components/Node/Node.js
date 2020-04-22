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
import { size, tint } from 'polished';

import {
  NEUTRAL,
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER,
  COLOR_MAP
} from '../../constants';

const baseStyles = css`
  label: node;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  ${size(48)};
  border-radius: 50%;
`;

const colorStyles = ({ theme, type }) => {
  const color = COLOR_MAP[type];

  if (!color) {
    return null;
  }

  return css`
    label: ${`node--${type}`};
    background-color: ${tint(0.9, theme.colors[color])};
  `;
};

const StyledNode = styled.div(baseStyles, colorStyles);

const Node = props => <StyledNode {...props} />;

Node.NEUTRAL = NEUTRAL;
Node.PRIMARY = PRIMARY;
Node.SUCCESS = SUCCESS;
Node.WARNING = WARNING;
Node.DANGER = DANGER;

Node.propTypes = {
  /**
   * The type of the node used to determine its color.
   */
  type: PropTypes.oneOf([
    Node.NEUTRAL,
    Node.PRIMARY,
    Node.SUCCESS,
    Node.WARNING,
    Node.DANGER
  ]).isRequired
};

Node.defaultProps = {
  type: NEUTRAL
};

/**
 * @component
 */
export default Node;
