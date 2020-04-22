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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { select } from '@storybook/addon-knobs/react';

import Heading from '../Heading';
import Text from '../Text';

import { ReactComponent as ValidIcon } from '../../icons/valid.svg';
import { ReactComponent as WarningIcon } from '../../icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../../icons/error.svg';
import { ReactComponent as NeutralIcon } from './icons/neutral.svg';
import { ReactComponent as PrimaryIcon } from './icons/primary.svg';

import { DIRECTION_MAP } from './constants';
import docs from './Timeline.docs.mdx';
import Timeline from '.';

const contentContainerStyles = ({ position }) => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 200px;
  ${position === Timeline.Content.LEFT &&
    css`
      align-items: flex-end;
      text-align: end;
    `};
  ${position === Timeline.Content.TOP &&
    css`
      justify-content: flex-end;
    `};
`;

const nodeStyles = ({ theme }) => css`
  border-radius: ${theme.borderRadius.mega};
  filter: hue-rotate(270deg) saturate(2);
  transform: rotate(10deg);
`;

const contentStyles = ({ theme }) => css`
  color: ${theme.colors.n700};
  transform: rotate(10deg) translateX(-12px);
`;

const ContentContainer = styled.div(contentContainerStyles);
const StyledNode = styled(Timeline.Node)(nodeStyles);
const StyledContent = styled(Timeline.Content)(contentStyles);

// eslint-disable-next-line react/prop-types
const ItemContent = ({ title, description, position }) => (
  <ContentContainer position={position}>
    <Heading size={Heading.KILO} noMargin>
      {title}
    </Heading>
    <Text noMargin>{description}</Text>
  </ContentContainer>
);

const getItems = position => [
  {
    key: 'item1',
    type: Timeline.Node.NEUTRAL,
    node: <NeutralIcon />,
    content: (
      <ItemContent
        title="Neutral"
        description="This is a timeline!"
        position={position}
      />
    )
  },
  {
    key: 'item2',
    type: Timeline.Node.PRIMARY,
    node: <PrimaryIcon />,
    content: (
      <ItemContent
        title="Primary"
        description="A bunch of connected nodes..."
        position={position}
      />
    )
  },
  {
    key: 'item3',
    type: Timeline.Node.SUCCESS,
    node: <ValidIcon />,
    content: (
      <ItemContent
        title="Success"
        description="... with some additional content for each node."
        position={position}
      />
    )
  },
  {
    key: 'item4',
    type: Timeline.Node.WARNING,
    node: <WarningIcon />,
    content: (
      <ItemContent
        title="Warning"
        description="There are 5 different types of nodes..."
        position={position}
      />
    )
  },
  {
    key: 'item5',
    type: Timeline.Node.DANGER,
    node: <ErrorIcon />,
    content: (
      <ItemContent
        title="Danger"
        description="... and 4 different content position options."
        position={position}
      />
    )
  }
];

export default {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    docs: { page: docs },
    jest: ['Timeline']
  }
};

export const base = () => {
  const position = select(
    'Position',
    {
      top: Timeline.Content.TOP,
      right: Timeline.Content.RIGHT,
      bottom: Timeline.Content.BOTTOM,
      left: Timeline.Content.LEFT
    },
    Timeline.Content.BOTTOM
  );

  return <Timeline items={getItems(position)} position={position} />;
};

export const customRenderProps = () => (
  <Timeline
    items={getItems(Timeline.Content.BOTTOM)}
    position={Timeline.Content.BOTTOM}
    renderNode={({ item: { type, node }, position, last }) => (
      <StyledNode {...{ type, position, last }}>{node}</StyledNode>
    )}
    renderConnector={({ position, last }) =>
      !last && <Timeline.Connector direction={DIRECTION_MAP[position]} />
    }
    renderContent={({ item: { content }, position, last }) => (
      <StyledContent {...{ position, last }}>{content}</StyledContent>
    )}
  />
);
