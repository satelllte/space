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
] as const;
