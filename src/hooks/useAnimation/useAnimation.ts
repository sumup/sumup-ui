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

import { useRef, useState, useEffect, useCallback } from 'react';

type Animation = {
  onStart: () => void;
  onEnd: () => void;
};

export function useAnimation(
  duration: number,
): [boolean, (animation: Animation) => void] {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [animation, setAnimation] = useState<Animation | null>(null);

  useEffect(() => {
    if (!animation) {
      return undefined;
    }

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    if (animation.onStart) {
      animation.onStart();
    }

    timerId.current = setTimeout(() => {
      if (animation.onEnd) {
        animation.onEnd();
      }
      setAnimation(null);
    }, duration);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [animation, duration]);

  const isAnimating = Boolean(animation);

  const animateFn = useCallback((nextAnimation: Animation) => {
    setAnimation(nextAnimation);
  }, []);

  return [isAnimating, animateFn];
}
