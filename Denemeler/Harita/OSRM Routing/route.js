const routeService = async () => {
  const request = await fetch("http://router.project-osrm.org/route/v1/driving/29.039287,40.998394;29.07491,40.977817?steps=true")
  const json = await request.json();
  console.log(json.routes[0].legs[0].steps);
  const steps = json.routes[0].legs[0].steps;

  const stepsArray = [];
  steps.forEach(step => {
    const movementType = step.maneuver.type;
    const movementModifier = step.maneuver.modifier;
    const roadName = step.name;

    if (movementType === "depart") {
      stepsArray.push(`Depart from ${roadName}`);
    } else if (movementType === "turn") {
      stepsArray.push(`Turn ${movementModifier}${roadName ? ` to ${roadName}` : ""}`);
    } else if (movementType === "new name") {
      stepsArray.push(`Go through ${roadName} (${movementModifier})`);
    } else if (movementType === "arrive") {
      stepsArray.push(`Arrive to your destination at ${roadName}`);
    } else if (movementType === "merge") {
      stepsArray.push(`Merge onto ${roadName} (${movementModifier})`);
    } else if (movementType === "on ramp") {
      stepsArray.push(`Take a ramp to enter ${roadName} (${movementModifier})`);
    } else if (movementType === "off ramp") {
      stepsArray.push(`Take a ramp to exit ${roadName} (${movementModifier})`);
    } else if (movementType === "fork") {
      stepsArray.push(`Take the ${movementModifier} side at ${roadName}`);
    } else if (movementType === "end of road") {
      stepsArray.push(`Road ends. Turn ${movementModifier} to ${roadName}`);
    } else if (movementType === "use lane") {
      // Bak buna
      stepsArray.push(`Road ends. Turn (${movementModifier})`);
    } else if (movementType === "continue") {
      stepsArray.push(`Turn in ${movementModifier} to stay on the road`);
    }
  })

  console.log(stepsArray);
}

routeService();

