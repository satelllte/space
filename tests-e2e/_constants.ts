export const SCENES = [
  {
    name: 'Moon',
    href: '/scenes/moon',
    title: 'satelllte/space • Moon',
  },
  {
    name: 'Particles',
    href: '/scenes/particles',
    title: 'satelllte/space • Particles',
  },
  {
    name: 'Transmission',
    href: '/scenes/transmission',
    title: 'satelllte/space • Transmission',
  },
] as const;

export const ARTICLES = [
  {
    name: 'Visual Regression Testing for Three.js Scenes',
    href: '/articles/visual-regression-testing-for-threejs-scenes/',
    title: 'satelllte/space • Visual Regression Testing for Three.js Scenes',
    description:
      "How to screenshot-test WebGL and WebGPU renderers with Playwright, and the cross-platform pitfalls you'll hit along the way.",
    publishedAt: '2026-09-26',
    tags: ['Three.js', 'React Three Fiber', 'Playwright', 'WebGPU', 'Testing'],
  },
] as const;
