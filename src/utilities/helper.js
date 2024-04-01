
export const regex = {
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,15}$/,
  };
export const setCookie = (data) => {
    console.log("cookieData",data)
    document.cookie = 'token=' + data?.accessToken;
    return true;
  };
  
  export const getToken = () => {
    const token = document.cookie.split('=')[1];
  
    return token;
  };