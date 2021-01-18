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
import { css } from '@emotion/core';

import Input from '../Input';
import { InputProps } from '../Input/Input';
import Label from '../Label';

export type DateRangeInputProps = InputProps;

const dateInputStyles = css`
  label: input-date;
  min-height: 42px;
  min-width: 8ch;
`;

/**
 * DateRangeInput component for forms.
 * Browsers that don't support type="date" inputs gracefully degrade
 * to a type="text" input.
 */
export const DateRangeInput = React.forwardRef(
  (props: DateRangeInputProps, ref: DateRangeInputProps['ref']) => (
    <fieldset>
      <Label as="legend" htmlFor="" />
      <Input
        {...props}
        inputStyles={dateInputStyles}
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        ref={ref}
      />
    </fieldset>
  ),
);

DateRangeInput.displayName = 'DateRangeInput';
