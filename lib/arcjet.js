import arcject, { tokenBucket } from '@arcjet/next';

const aj = arcject({
  key: process.env.ARCJET_KEY,
  characteristics: ['userId'],
  rules: [
    tokenBucket({
      mode: 'LIVE',
      refillRate: 10,
      interval: 6,
      capacity: 10,
    }),
  ],
});

export default aj;
