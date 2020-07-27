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

import { HTMLProps } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

import {
  ResponsiveProp,
  getSpanStyles,
  getSkipStyles,
  getBreakPointStyles,
} from './ColService';

export interface ColProps extends Omit<HTMLProps<HTMLDivElement>, 'span'> {
  /**
   * The amount to skip for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * skip of 6 columns. Accepts negative values as well.
   */
  skip?: ResponsiveProp;
  /**
   * The amount to span for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * span of 6 columns.
   */
  span?: ResponsiveProp;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

const skipStyles = ({ theme, skip }: StyleProps & ColProps) => {
  if (!skip) {
    return null;
  }
  return isString(skip) || isNumber(skip)
    ? createSkipStyles(theme.grid.default, theme, skip)
    : composeBreakpoints(createSkipStyles, theme.grid, theme, skip);
};

const baseStyles = ({
  theme,
  skip = '0',
  span = '0',
}: StyleProps & ColProps) => css`
  label: col;

  box-sizing: border-box;
  float: left;

  ${getBreakPointStyles(theme)};
  ${getSpanStyles(theme, span)};
  ${getSkipStyles(theme, skip)};
`;

/**
 * Content wrapping for the Grid component. Allows sizing based on provided
 * props.
 */
export const Col = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'span',
})<ColProps>(baseStyles, skipStyles);
