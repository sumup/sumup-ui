/**
 * Copyright 2020, SumUp Ltd.
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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { hideVisually } from '../../styles/style-helpers';
import Spinner from '../Spinner';

const centeredStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${theme.spacings.kilo};
`;

const Centered = styled('div')(centeredStyles);

const spinnerStyles = (theme: Theme) => css`
  color: ${theme.colors.p500};
`;

export interface FallbackProps {
  label: string;
}

export const Fallback = ({ label, ...props }: FallbackProps) => (
  <Centered {...props}>
    <Spinner css={spinnerStyles} />
    <span css={hideVisually}>{label}</span>
  </Centered>
);
