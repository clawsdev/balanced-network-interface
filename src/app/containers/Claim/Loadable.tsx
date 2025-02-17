/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Claim = lazyLoad(
  () => import('./index'),
  module => module.Claim,
);
