const _ = require('lodash');

const distancesMatrix = [
  [0,630,1144,743,1001,867,418,754,672,1658],
  [630,0,380,317,435,301,234,188,246,1166],
  [1166,380,0,793,321,269,710,429,722,1236],
  [743,317,793,0,688,554,347,370,158,976],
  [1001,434,321,688,0,164,605,324,617,1261],
  [867,300,269,554,164,0,471,190,483,1209],
  [418,234,710,364,605,471,0,358,276,1262],
  [754,187,429,370,324,190,358,0,263,987],
  [672,246,722,158,617,483,255,263,0,1074],
  [1558,1065,1210,876,1105,971,1162,887,973,0]
]

const containersToBeCollected = [2, 5, 8, 6];
const orderedContainers = []


// Calculating the first container to be collected
const firstContainerToBeCollected = () => {
  let startingContainer;
  let minimumDistance = 0;

  containersToBeCollected.forEach(container => {

    if (minimumDistance === 0) {
      minimumDistance = distancesMatrix[0][container];
    }

    if (minimumDistance > distancesMatrix[0][container]) {
      minimumDistance = distancesMatrix[0][container];
      startingContainer = container
    }
  })

  console.log("Starting container: ", startingContainer);
  console.log("Minimum distance: ", minimumDistance);
  orderedContainers.push(startingContainer);
  return startingContainer;
}

const startingContainer = firstContainerToBeCollected();

// Calculating the other containers to be collected
let otherContainers = _.without(containersToBeCollected, startingContainer);
console.log(otherContainers)

const containerOrderer = (array) => {
  let nextContainer;
  let minimumDistance = 0;
  array.forEach(container => {
    console.log(container)
    if (minimumDistance === 0) {
      minimumDistance = distancesMatrix[_.last(orderedContainers)][container];
      console.log(minimumDistance)
    }

    if (minimumDistance > distancesMatrix[_.last(orderedContainers)][container]) {
      minimumDistance = distancesMatrix[_.last(orderedContainers)][container];
      nextContainer = container
    }
  })

  console.log("Next container: ", nextContainer);
  console.log("Minimum distance: ", minimumDistance);
  orderedContainers.push(nextContainer);

  if (containersToBeCollected.length - orderedContainers.length !== 1) {
    containerOrderer(_.without(array, nextContainer))
  } else {
    orderedContainers.push(array[0]);
  }
}

containerOrderer(otherContainers);

console.log(orderedContainers)




