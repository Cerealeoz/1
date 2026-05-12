export interface Direction {
  min: number;
  max: number;
  name: string;
  abbr: string;
}

export const directions: Direction[] = [
  { min: 337.5, max: 360, name: '北', abbr: 'N' },
  { min: 292.5, max: 337.5, name: '西北', abbr: 'NW' },
  { min: 247.5, max: 292.5, name: '西', abbr: 'W' },
  { min: 202.5, max: 247.5, name: '西南', abbr: 'SW' },
  { min: 157.5, max: 202.5, name: '南', abbr: 'S' },
  { min: 112.5, max: 157.5, name: '东南', abbr: 'SE' },
  { min: 67.5, max: 112.5, name: '东', abbr: 'E' },
  { min: 22.5, max: 67.5, name: '东北', abbr: 'NE' },
  { min: 0, max: 22.5, name: '北', abbr: 'N' },
];

export const getDirectionName = (heading: number): Direction => {
  const normalizedHeading = ((heading % 360) + 360) % 360;
  
  for (const direction of directions) {
    if (normalizedHeading >= direction.min && normalizedHeading < direction.max) {
      return direction;
    }
  }
  
  return directions[0];
};

export const getCompassRotation = (heading: number): number => {
  return -heading;
};

export const formatHeading = (heading: number): string => {
  return Math.round(((heading % 360) + 360) % 360).toString().padStart(3, '0') + '°';
};

export const getCardinalDirection = (heading: number): string => {
  const direction = getDirectionName(heading);
  return direction.name;
};

export const generateCompassMarks = (): Array<{ angle: number; label: string; major: boolean }> => {
  const marks = [];
  for (let i = 0; i < 360; i += 5) {
    const isMajor = i % 30 === 0;
    marks.push({
      angle: i,
      label: isMajor ? i.toString() : '',
      major: isMajor
    });
  }
  return marks;
};

export const getDirectionAngle = (direction: string): number => {
  const angles: { [key: string]: number } = {
    'N': 0,
    'NE': 45,
    'E': 90,
    'SE': 135,
    'S': 180,
    'SW': 225,
    'W': 270,
    'NW': 315,
  };
  return angles[direction] || 0;
};
