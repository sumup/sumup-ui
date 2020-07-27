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

import { css } from '@emotion/core';
import {
  clamp,
  toPairs,
  head,
  flow,
  curry,
  map,
  mapValues,
  values,
} from 'lodash/fp';
import { Theme } from '@sumup/design-tokens';

export type Breakpoint = keyof Theme['grid'] | 'default';
export type ResponsiveProp =
  | string
  | number
  | { [key in Breakpoint]: string | number };
type Grid = {
  priority: number;
  breakpoint: Breakpoint;
  cols: number;
  maxWidth: string;
  gutter: string;
};

const MIN_COL_SPAN = 1;
const MAX_COL_WIDTH = 100;
const DEFAULT_BREAKPOINT = 'default';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export const wrapStyles = (theme: Theme, styles, breakpoint: Breakpoint) =>
  breakpoint === DEFAULT_BREAKPOINT
    ? css(styles)
    : css`
        ${theme.mq[breakpoint]} {
          ${styles}
        }
      `;

export const createSpanStyles = (grid: Grid, theme: Theme, span: number) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSpan: number = clamp(MIN_COL_SPAN, cols, span);

  const styles = `
    width: ${(MAX_COL_WIDTH / cols) * safeSpan}%;
  `;

  return wrapStyles(theme, styles, breakpoint);
};

export const createSkipStyles = (grid: Grid, theme: Theme, skip: number) => {
  if (!grid) {
    return null;
  }

  const { cols, breakpoint } = grid;
  const safeSkip = clamp(cols * -1, cols - 1, skip);

  const styles = `
    left: ${(MAX_COL_WIDTH / cols) * safeSkip}%;
    position: relative;
  `;

  return wrapStyles(theme, styles, breakpoint);
};

const createBreakpointStyles = curry((theme: Theme, current: Grid) => {
  const config = theme.grid[current.breakpoint];

  if (!config) {
    return null;
  }

  const styles = `
    padding-left: calc(${config.gutter} / 2);
    padding-right: calc(${config.gutter} / 2);
  `;

  return wrapStyles(theme, styles, current.breakpoint);
});

/**
 * Return the default styles for each breakpoint provided by the config
 */
export const getBreakPointStyles = (theme: Theme) =>
  flow(mapValues(createBreakpointStyles(theme)), values)(theme.grid);

/**
 * Sort the key/value based on the breakpoint priority
 * defined on the grid config.
 */
export const sortByPriority = curry((grid: Grid, iteratee) =>
  iteratee.sort((a, b) => grid[head(a)].priority - grid[head(b)].priority),
);

/**
 * Map the provided key/value breakpoint into styles based on the grid/theme
 * config.
 */
export const mapBreakpoint = curry(
  (fn, grid: Grid, theme: Theme, [key, value]) => fn(grid[key], theme, value),
);

/**
 * Compose the breakpoints object into an array of styles.
 */
const composeBreakpoints = curry((fn, grid: Grid, theme: Theme, breakpoints) =>
  flow(
    toPairs,
    sortByPriority(grid),
    map(mapBreakpoint(fn, grid, theme)),
  )(breakpoints),
);

/**
 * Return the styles of the span based on the provided value. If it is a string
 * returns a single style, otherwise composes the breakpoints into an array of
 * styles
 */
export const getSpanStyles = (
  { grid, ...theme }: Theme,
  span: ResponsiveProp,
) =>
  isString(span) || isNumber(span)
    ? createSpanStyles(grid.default, theme, span)
    : composeBreakpoints(createSpanStyles, grid, theme, span);

/**
 * Return the styles of the skip based on the provided value. If it is a string
 * returns a single style, otherwise composes the breakpoints into an array of
 * styles
 */
export const getSkipStyles = (
  { grid, ...theme }: Theme,
  skip: ResponsiveProp,
) =>
  isString(skip) || isNumber(skip)
    ? createSkipStyles(grid.default, theme, skip)
    : composeBreakpoints(createSkipStyles, grid, theme, skip);
