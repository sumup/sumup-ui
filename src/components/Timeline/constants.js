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

import {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
  NEUTRAL,
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER
} from '../../util/constants';

export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';

export const DIRECTION_MAP = {
  [TOP]: HORIZONTAL,
  [RIGHT]: VERTICAL,
  [BOTTOM]: HORIZONTAL,
  [LEFT]: VERTICAL
};

export { TOP, RIGHT, BOTTOM, LEFT };
export { NEUTRAL, PRIMARY, SUCCESS, WARNING, DANGER };

export const COLOR_MAP = {
  [NEUTRAL]: 'n500',
  [PRIMARY]: 'b500',
  [SUCCESS]: 'g500',
  [WARNING]: 'y500',
  [DANGER]: 'r500'
};
