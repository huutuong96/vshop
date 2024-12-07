import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://holy-macaque-27274.upstash.io',
  token: 'AWqKAAIjcDEyNmQ2Mjg4MmVjNTc0N2QxOThhYzZkYWRiNjU1ZTQ3NHAxMA',
})

export default redis;