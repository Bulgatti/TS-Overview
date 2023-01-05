import http from 'k6/http';
import { sleep, check } from 'k6';

const URL = 'http://localhost:3030';

// export const options = {
//   stages: [
//     { duration: '2s', target: 1 },
//     { duration: '2s', target: 1 },
//     { duration: '10s', target: 10 },
//     { duration: '10s', target: 10 },
//     { duration: '45s', target: 100 },
//     { duration: '45s', target: 100 },
//     { duration: '2m', target: 1000 },
//     { duration: '2m', target: 1000 },
//     { duration: '2m', target: 0 },
//   ],
// };

export const options = {
  // scenarios: {
  //   foo: {
  //     executor: 'constant-arrival-rate',
  //     rate: 1000,
  //     timeUnit: '1s',
  //     duration: '10s',
  //     preAllocatedVUs: 2000,
  //   },
  // },
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '30s', target: 1000 }],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(100)<3000'],
  },
};

export default function () {
  // const product_id = Math.floor(Math.random() * 1000000) + 1;

  // const responses = http.batch([
  //   ['GET', `${URL}/products/${product_id}`],
  //   ['GET', `${URL}/products/${product_id}/styles`],
  //   ['GET', `${URL}/products/${product_id}/related`],
  // ]);

  // check(responses[0], {
  //   'getProduct status was 200': (res) => res.status === 200,
  // });

  // check(responses[1], {
  //   'getStyles status was 200': (res) => res.status === 200,
  // });

  // check(responses[2], {
  //   'getRelated status was 200': (res) => res.status === 200,
  // });

  const res = http.get(`${URL}/products/100000/styles`);
  check(res, {
    'status was 200': (r) => r.status === 200,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
