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

import { useState, useRef, useCallback, HTMLProps } from 'react';

import { uniqueId } from '../../util/id';
import { useAnimation } from '../useAnimation';

const DEFAULT_HEIGHT = 'auto';

type Options = {
  initialOpen?: boolean;
  duration?: number;
  detailId?: string;
};

interface ButtonProps extends HTMLProps<HTMLElement> {
  'type': 'button';
  'role': 'button';
  'onClick': Required<HTMLProps<HTMLElement>>['onClick'];
  'tabIndex': number;
  'aria-controls': string;
  'aria-expanded': 'true' | 'false';
}

type Collapsible = {
  isOpen: boolean;
  toggleOpen: () => void;
  getButtonProps: (props?: HTMLProps<HTMLElement>) => ButtonProps;
  getContentProps: (props?: HTMLProps<HTMLElement>) => HTMLProps<HTMLElement>;
};

export function useCollapsible({
  initialOpen = false,
  duration = 300,
  detailId,
}: Options = {}): Collapsible {
  const detailElement = useRef<HTMLElement | null>(null);
  const [isOpen, setOpen] = useState(initialOpen);
  const [height, setHeight] = useState(getHeight(detailElement.current));
  const [, setAnimating] = useAnimation(duration);

  const id = detailId || uniqueId('collapsible_');

  const toggleOpen = useCallback(() => {
    setAnimating({
      onStart: () => {
        setHeight(getHeight(detailElement.current));
        if (!isOpen) {
          setOpen(true);
        }
      },
      onEnd: () => {
        if (isOpen) {
          setOpen(false);
        }
        setHeight(DEFAULT_HEIGHT);
      },
    });
  }, [isOpen, detailElement, setAnimating]);

  return {
    isOpen,
    toggleOpen,
    getButtonProps: (props = {}) => ({
      ...props,
      'type': 'button',
      'role': 'button',
      'onClick': (event) => {
        toggleOpen();
        if (props.onClick) {
          props.onClick(event);
        }
      },
      'tabIndex': props.tabIndex || 0,
      'aria-controls': id,
      'aria-expanded': isOpen ? 'true' : 'false',
    }),
    getContentProps: (props = {}) => ({
      ...props,
      'ref': detailElement,
      'id': id,
      'style': {
        ...props.style,
        overflow: 'hidden',
        willChange: 'height',
        opacity: isOpen ? 1 : 0,
        height: isOpen ? height : 0,
      },
      'aria-hidden': isOpen ? undefined : 'true',
    }),
  };
}

export function getHeight(element: HTMLElement | null) {
  if (!element) {
    return DEFAULT_HEIGHT;
  }
  return `${element.scrollHeight}px`;
}
