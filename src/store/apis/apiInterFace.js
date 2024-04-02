import{createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utilities/helper';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      const token = getToken();
  
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
  
      return headers;
    },
  });

export const apiInterFace = createApi({
    reducerPath: 'apiInterface',
    baseQuery:baseQuery,
    endpoints:  ()=>({}),
    tagTypes:['User']
});