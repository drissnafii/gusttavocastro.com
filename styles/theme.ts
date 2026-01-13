export const theme = {
  colors: {
    yellow: '#ffff80',
    pink: '#ff80bf',
    purple: '#9580ff',
    red: '#ff9580',
    orange: '#ffca80',
    green: '#8aff80',
    cyan: '#80ffea',
    primary: '#f2f2f2',
    secondary: '#8f9ba8',
    background: '#08070b',
    hover: '#212024',
    command: 'rgba(255, 255, 255, 0.05)',
  },
  fonts: {
    body: 'Biotif, sans-serif',
    code: 'Fira Code, monospace',
    heading: 'Neuzeit Grotesk Bold, sans-serif',
  },
  space: {
    navHeightDesktop: '110px',
    navHeightMobile: '140px',
  },
  transitions: {
    duration: '0.2s',
  },
  radii: {
    borderRadius: '8px',
  },
  media: {
    bp1: '(min-width: 425px)',
    bp2: '(min-width: 760px)',
    bp3: '(max-width: 780px)',
    bp4: '(max-width: 1024px)',
  },
} as const

export type Theme = typeof theme
