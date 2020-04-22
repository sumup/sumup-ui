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

import { TOP, RIGHT, BOTTOM, LEFT } from '../../constants';

const baseStyles = css`
  label: content;
  display: flex;
  flex: 1;
`;

const topStyles = ({ theme, position, last }) =>
  position === TOP &&
  css`
    label: content--top;
    margin: 0 ${last ? 0 : theme.spacings.exa} ${theme.spacings.mega} 0;
  `;

const rightStyles = ({ theme, position, last }) =>
  position === RIGHT &&
  css`
    label: content--right;
    margin: 0 0 ${last ? 0 : theme.spacings.exa} ${theme.spacings.mega};
  `;

const bottomStyles = ({ theme, position, last }) =>
  position === BOTTOM &&
  css`
    label: content--bottom;
    margin: ${theme.spacings.mega} ${last ? 0 : theme.spacings.exa} 0 0;
  `;

const leftStyles = ({ theme, position, last }) =>
  position === LEFT &&
  css`
    label: content--left;
    margin: 0 ${theme.spacings.mega} ${last ? 0 : theme.spacings.exa} 0;
  `;

const StyledContent = styled.div(
  baseStyles,
  topStyles,
  rightStyles,
  bottomStyles,
  leftStyles
);

const Content = props => <StyledContent {...props} />;

Content.TOP = TOP;
Content.RIGHT = RIGHT;
Content.BOTTOM = BOTTOM;
Content.LEFT = LEFT;

Content.propTypes = {
  /**
   * The position of the content of the timeline item in relation to its node.
   */
  position: PropTypes.oneOf([
    Content.TOP,
    Content.RIGHT,
    Content.BOTTOM,
    Content.LEFT
  ]).isRequired,
  /**
   * Whether this is the content of the last timeline item.
   */
  last: PropTypes.bool
};

Content.defaultProps = {
  position: RIGHT,
  last: false
};

/**
 * @component
 */
export default Content;
