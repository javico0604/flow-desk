import { Provider } from '@angular/core';
import { ApiConfiguration } from '../api-client/api-configuration';

export function provideApi(url: string): Provider {
  return {
    provide: ApiConfiguration,
    useFactory: () => {
      const config = new ApiConfiguration();
      config.rootUrl = url;
      return config;
    },
  };
}