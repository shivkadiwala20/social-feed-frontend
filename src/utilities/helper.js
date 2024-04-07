export const regex = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,15}$/,
};
export const setCookie = (data) => {
  //console.log('cookieData', data);
  document.cookie = 'data=' + data?.accessToken;
  return true;
};

export const getToken = () => {
  const data = document.cookie.split('=')[1];

  return data;
};

export const deleteCookie = () => {
  document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // document.cookie = token + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
  return true;
};
