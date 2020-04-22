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

/* eslint-disable react/prop-types, react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
  HORIZONTAL,
  VERTICAL,
  DIRECTION_MAP
} from './constants';
import Node from './components/Node';
import Connector from './components/Connector';
import Content from './components/Content';

const containerBaseStyles = css`
  label: timeline__container;
  display: flex;
`;

const containerPositionStyles = ({ position }) => {
  const direction = DIRECTION_MAP[position];
  const flexDirectionMap = {
    [HORIZONTAL]: 'row',
    [VERTICAL]: 'column'
  };

  return css`
    label: ${`timeline__container--${direction}`};
    flex-direction: ${flexDirectionMap[direction]};
  `;
};

const itemBaseStyles = css`
  label: timeline__item;
  display: flex;
`;

const itemPositionStyles = ({ position }) => {
  const flexDirectionMap = {
    [TOP]: 'column-reverse',
    [RIGHT]: 'row',
    [BOTTOM]: 'column',
    [LEFT]: 'row-reverse'
  };

  return css`
    label: ${`timeline__item--${position}`};
    flex-direction: ${flexDirectionMap[position]};
  `;
};

const linkBaseStyles = css`
  label: timeline__link;
  display: flex;
  align-items: center;
  flex: none;
`;

const linkPositionStyles = ({ position }) => {
  const direction = DIRECTION_MAP[position];
  const flexDirection = direction === HORIZONTAL ? 'row' : 'column';

  return css`
    label: ${`timeline__link--${direction}`};
    flex-direction: ${flexDirection};
  `;
};

const TimelineContainer = styled.div(
  containerBaseStyles,
  containerPositionStyles
);
const TimelineItem = styled.div(itemBaseStyles, itemPositionStyles);
const TimelineLink = styled.div(linkBaseStyles, linkPositionStyles);

const Timeline = ({
  items,
  position,
  renderNode: RenderNode,
  renderConnector: RenderConnector,
  renderContent: RenderContent,
  ...rest
}) => (
  <TimelineContainer {...{ position, ...rest }}>
    {items &&
      items.map((item, index) => {
        const { key } = item;
        const last = index === items.length - 1;
        return (
          <TimelineItem key={key} {...{ position }}>
            <TimelineLink {...{ position }}>
              <RenderNode {...{ item, position, last }} />
              <RenderConnector
                {...{ item, nextItem: items[index + 1], position, last }}
              />
            </TimelineLink>
            <RenderContent {...{ item, position, last }} />
          </TimelineItem>
        );
      })}
  </TimelineContainer>
);

Timeline.Node = Node;
Timeline.Connector = Connector;
Timeline.Content = Content;

Timeline.propTypes = {
  /**
   * An array of timeline items. Each item must have a `key`. In order to use
   * the default render props the item must also have `type`, `node` and
   * `content` props.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf([
        Node.NEUTRAL,
        Node.PRIMARY,
        Node.SUCCESS,
        Node.WARNING,
        Node.DANGER
      ]),
      node: PropTypes.node,
      content: PropTypes.node
    })
  ).isRequired,
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
   * A render prop that should render a timeline node. Receives an `item`, the
   * content `position` and whether it is the `last` item as props. By default
   * renders a circle with the `node` prop of `item` as children.
   */
  renderNode: PropTypes.func.isRequired,
  /**
   * A render prop that should render a line connecting two nodes. Receives an
   * `item`, a `nextItem`, the content `position` and whether it is the `last`
   * item as props. By default renders a gradient line.
   */
  renderConnector: PropTypes.func.isRequired,
  /**
   * A render prop that should render the item's content. Receives an `item`,
   * the content `position` and whether it is the `last` item as props. By
   * default renders a padded container with the `content` prop of `item` as
   * children.
   */
  renderContent: PropTypes.func.isRequired
};

Timeline.defaultProps = {
  position: RIGHT,
  renderNode: ({ item: { type, node }, position, last }) => (
    <Node {...{ type, position, last }}>{node}</Node>
  ),
  renderConnector: ({ item, nextItem, position, last }) =>
    !last && (
      <Connector
        direction={DIRECTION_MAP[position]}
        gradient
        startType={item.type}
        endType={nextItem.type}
      />
    ),
  renderContent: ({ item: { content }, position, last }) => (
    <Content {...{ position, last }}>{content}</Content>
  )
};

/**
 * @component
 */
export default Timeline;
