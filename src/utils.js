export const checkCollision = (point1, point2) => {
  const distance = Math.sqrt(
    (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
  );
  return distance < point1.radius + point2.radius;
};

export const findNonCollidingPosition = (
  person,
  centerX,
  centerY,
  radius,
  galaxyPoints,
  maxAttempts = 10
) => {
  let angle = Math.random() * 2 * Math.PI;
  let x, y, collision;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    x = centerX + radius * Math.cos(angle);
    y = centerY + radius * Math.sin(angle);

    collision = false;
    for (let j = 0; j < galaxyPoints.length; j++) {
      if (checkCollision({ x, y, radius: person.radius }, galaxyPoints[j])) {
        collision = true;
        break;
      }
    }

    if (!collision) return { x, y };

    angle += Math.PI / 5;
  }

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
};

export const distributePoints = (
  data,
  numCircles,
  centerX,
  centerY,
  maxRadius
) => {
  const pointsPerCircle = Math.ceil(data.length / numCircles);
  const galaxyPoints = [];

  data.forEach((person, index) => {
    const circleIndex = Math.floor(index / pointsPerCircle);
    const radius = ((circleIndex + 1) / numCircles) * maxRadius;

    const { x, y } = findNonCollidingPosition(
      person,
      centerX,
      centerY,
      radius,
      galaxyPoints
    );

    galaxyPoints.push({ ...person, x, y });
  });

  return galaxyPoints;
};
