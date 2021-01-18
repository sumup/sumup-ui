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

/** @jsx jsx */
import { forwardRef, Fragment, Ref, ReactNode, HTMLProps } from 'react';
import { css, jsx, InterpolationWithTheme } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  hideVisually,
  inputOutline,
} from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import Label from '../Label';
import ValidationHint from '../ValidationHint';

export interface BaseDateInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'label' | 'type'> {
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Triggers warning styles on the component.
   */
  hasWarning?: boolean;
  /**
   * Enables valid styles on the component.
   */
  showValid?: boolean;
  /**
   * Triggers readonly styles on the component.
   */
  readOnly?: boolean;
  /**
   * The ref to the html dom element
   */
  ref?: Ref<HTMLInputElement>;
}

const sharedStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  padding: calc(${theme.spacings.byte} + 1px) ${theme.spacings.kilo};
  background-color: ${theme.colors.white};
  border-radius: 8px;
  ${textMega({ theme })};
`;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  label: input-date;
  -webkit-appearance: none;
  border: none;
  outline: 0;
  min-width: 8ch;
  min-height: 42px;
  margin: 0;

  &::placeholder {
    color: ${theme.colors.n500};
    transition: color ${theme.transitions.default};
  }
`;

const BaseInput = styled('input')<BaseDateInputProps>(
  inputBaseStyles,
  sharedStyles,
);

// const placeholderStyles = ({ theme }: StyleProps) => css`
//   display: none;
//   position: absolute;
//   top: 0;
//   left: 0;
//   color: ${theme.colors.n500};
//   transition: color ${theme.transitions.default};

//   &::placeholder-shown {
//     display: block;
//   }
// `;

// const Placeholder = styled('div')(sharedStyles, placeholderStyles);

export const BaseDateInput = forwardRef(
  (props: BaseDateInputProps, ref: BaseDateInputProps['ref']) => (
    <Fragment>
      <BaseInput {...props} type="date" pattern="\d{4}-\d{2}-\d{2}" ref={ref} />
      {/* {props.placeholder && (
        <Placeholder aria-hidden>{props.placeholder}</Placeholder>
      )} */}
    </Fragment>
  ),
);

BaseDateInput.displayName = 'BaseDateInput';

export interface DateInputProps extends BaseDateInputProps {
  /**
   * A clear and concise description of the input purpose.
   * Will become required in the next major version of Circuit UI.
   */
  label?: ReactNode;
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint?: string;
  /**
   * Trigger inline styles on the component.
   */
  inline?: boolean;
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * Emotion style object to overwrite the input element styles.
   */
  inputStyles?: InterpolationWithTheme<Theme>;
  /**
   * Emotion style object to overwrite the input label element styles.
   */
  labelStyles?: InterpolationWithTheme<Theme>;
}

const labelTextStyles = ({ theme }: StyleProps) => css`
  label: input__label-text;
  display: inline-block;
  margin-bottom: ${theme.spacings.bit};
`;

const labelTextHiddenStyles = ({ hideLabel }: { hideLabel?: boolean }) =>
  hideLabel &&
  css`
    label: input__label-text--hidden;
    ${hideVisually()};
  `;

const LabelText = styled('span')<{ hideLabel?: boolean }>(
  labelTextStyles,
  labelTextHiddenStyles,
);

const containerStyles = () => css`
  label: input__container;
  position: relative;
`;

const InputContainer = styled('div')(containerStyles);

const inputReadonlyStyles = ({
  theme,
  readOnly,
}: StyleProps & DateInputProps) =>
  readOnly &&
  css`
    label: input--readonly;
    background-color: ${theme.colors.n100};
  `;

const inputDisabledStyles = ({
  theme,
  disabled,
}: StyleProps & DateInputProps) =>
  disabled &&
  css`
    label: input--disabled;
    background-color: ${theme.colors.n200};
  `;

const InputElement = styled(BaseDateInput)<DateInputProps>(
  inputBaseStyles,
  inputReadonlyStyles,
  inputDisabledStyles,
  inputOutline,
);

/**
 * DateInput component for forms.
 * Browsers that don't support type="date" inputs gracefully degrade
 * to a type="text" input.
 */
export const DateInput = forwardRef(
  (
    {
      value,
      validationHint,
      invalid,
      hasWarning,
      showValid,
      inline,
      disabled,
      labelStyles,
      inputStyles,
      label,
      hideLabel,
      id: customId,
      ...props
    }: DateInputProps,
    ref: DateInputProps['ref'],
  ) => {
    const id = customId || uniqueId('input_');
    return (
      <Label htmlFor={id} inline={inline} disabled={disabled} css={labelStyles}>
        {label && <LabelText hideLabel={hideLabel}>{label}</LabelText>}

        <InputContainer>
          <InputElement
            {...props}
            id={id}
            value={value}
            ref={ref}
            invalid={invalid}
            aria-invalid={invalid}
            disabled={disabled}
            hasWarning={hasWarning}
            css={inputStyles}
          />
        </InputContainer>
        <ValidationHint
          disabled={disabled}
          invalid={invalid}
          hasWarning={hasWarning}
          showValid={showValid}
          validationHint={validationHint}
        />
      </Label>
    );
  },
);

DateInput.displayName = 'DateInput';
