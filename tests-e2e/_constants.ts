export const SCENES = [
  {
    name: 'Moon',
    href: '/scenes/moon',
    title: 'Moon • satelllte/space',
  },
  {
    name: 'Particles',
    href: '/scenes/particles',
    title: 'Particles • satelllte/space',
  },
  {
    name: 'Transmission',
    href: '/scenes/transmission',
    title: 'Transmission • satelllte/space',
  },
] as const;

export const ARTICLES = [
  {
    name: 'Visual Regression Testing for Three.js Scenes',
    href: '/articles/visual-regression-testing-for-threejs-scenes/',
    title: 'Visual Regression Testing for Three.js Scenes • satelllte/space',
    description:
      "How to screenshot-test WebGL and WebGPU renderers with Playwright, and the cross-platform pitfalls you'll hit along the way.",
    publishedAt: '2026-09-28',
    tags: ['Three.js', 'React Three Fiber', 'Playwright', 'WebGPU', 'Testing'],
  },
  {
    name: 'Stretching Pixels: A Glitchy Post-Processing Pass in 25 Lines of GLSL',
    href: '/articles/stretching-pixels-with-glsl/',
    title:
      'Stretching Pixels: A Glitchy Post-Processing Pass in 25 Lines of GLSL • satelllte/space',
    description:
      'How a single clamp, a pinch of fract(sin(x)) and a floor turn a clean render into a jittery, VHS-flavored smear.',
    publishedAt: '2026-10-06',
    tags: [
      'GLSL',
      'Shaders',
      'Post-processing',
      'Three.js',
      'React Three Fiber',
    ],
  },
] as const;
