import { Vector2 } from "../../game-shared/src/util/physics";

export interface Animation {
  duration: number;
  frames: {
    [k: number]: Vector2;
  };
}

export function animate(startedAt: number, position: Vector2, animation: Animation): Vector2 {
  const { duration, frames } = animation;
  const currentProgress = (((Date.now() - startedAt) % duration) * 100) / duration;
  const framesSteps = Object.keys(frames).map((it) => Number.parseInt(it, 10));
  let currentFrameIdx = framesSteps.length - 1;

  for (let i = framesSteps.length - 1; i >= 0; i--) {
    if (currentProgress > framesSteps[i]) {
      currentFrameIdx = i;
      break;
    }
  }

  const nextFrameIdx = currentFrameIdx === framesSteps.length - 1 ? 0 : currentFrameIdx + 1;
  const currentFrameStep = framesSteps[currentFrameIdx];
  const nextFrameStep = framesSteps[nextFrameIdx];
  const { x: x0, y: y0 } = frames[currentFrameStep];
  const { x: x1, y: y1 } = frames[nextFrameStep];

  const frameLength =
    currentFrameStep > nextFrameStep
      ? 100 - currentFrameStep + nextFrameStep
      : nextFrameStep - currentFrameStep;

  const frameProgress = (currentProgress - currentFrameStep) / frameLength;

  return {
    x: position.x + x0 + (x1 - x0) * frameProgress,
    y: position.y + y0 + (y1 - y0) * frameProgress,
  };
}

export function bounce(size: number): Animation {
  return {
    duration: 700,
    frames: {
      0: {
        x: 0,
        y: 0,
      },
      20: {
        x: 0,
        y: size * 0.1,
      },
      40: {
        x: 0,
        y: 0,
      },
    },
  };
}
