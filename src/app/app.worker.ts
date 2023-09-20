import { generateRandomColor, generateRandomFloat, getRandomInt } from "./utils";
import { SIZE, TIMER, WORKER_EVENTS } from "./constants";
import { DataItem } from "./types";

const generateRandomItem = (id: number): DataItem => {
  return {
    id,
    int: getRandomInt(),
    float: generateRandomFloat(),
    color: generateRandomColor(),
    child: {
      id: getRandomInt(),
      color: generateRandomColor(),
    }
  };
}

function simulatePseudoSocket() {
  let size = SIZE;
  let timer = TIMER;

  addEventListener('message', ({ data }) => {
    if (data && typeof data === 'object') {
      const { action, value } = data;

      switch (action) {
        case WORKER_EVENTS.SET_INTERVAL:
          timer = value;
          break;
        case WORKER_EVENTS.SET_SIZE:
          size = value;
          break;
      }
    }
  });
  const generate = () => {
    let data: DataItem[] = [];

    for (let i = 0; i < size; i++) {
      data.push(generateRandomItem(i + 1));
    }

    postMessage(data);

    // timeout is used so as not to clog the queue of tasks, as can happen with an interval
    setTimeout(generate, timer);
  }

  generate()
}

simulatePseudoSocket();
