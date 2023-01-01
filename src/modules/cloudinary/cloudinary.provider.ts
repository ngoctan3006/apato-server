import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dtmvtmccf',
      api_key: '315635515169485',
      api_secret: 'lc1B3osztBcrTLcAVaLYztQS-pQ',
    });
  },
};
