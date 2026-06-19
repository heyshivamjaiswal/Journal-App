import arcject, { tokenBucket } from '@arcjet/next';

const aj = arcject({
  key: process.env.ARCJET_KEY,
  characteristics: ['userId'],
  rules: [
    tokenBucket({
      mode: 'LIVE',
      refillRate: 20,
      interval: 3600,
      capacity: 20,
    }),
  ],
});

export default aj;
