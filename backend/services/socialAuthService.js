import axios from 'axios';

const getAccessToken = async (url, data) => {
  return await axios({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      ...data,
      grant_type: 'authorization_code',
    },
  });
};

const getUserInfo = async (url, access_token) => {
  return await axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

module.exports = {
  google: {
    getAccessToken: async (code, redirect_uri) => {
      return await getAccessToken(process.env['GOOGLE_ACCESS_TOKEN_URI'], {
        code,
        redirect_uri,
        client_id: process.env['GOOGLE_CLIENT_ID'],
        client_secret: process.env['GOOGLE_CLIENT_SECRET'],
      });
    },
    getUserInfo: async (access_token) => {
      return await getUserInfo(process.env['GOOGLE_USER_PROFILE_URI'], access_token);
    },
  },
  linkedin: {
    getAccessToken: async (code, redirect_uri) => {
      return await getAccessToken(process.env['LINKEDIN_ACCESS_TOKEN_URI'], {
        code,
        redirect_uri,
        client_id: process.env['LINKEDIN_CLIENT_ID'],
        client_secret: process.env['LINKEDIN_CLIENT_SECRET'],
      });
    },
    getUserInfo: async (access_token) => {
      let email = await getUserInfo(process.env['LINKEDIN_USER_EMAIL_URI'], access_token);
      if (email?.data?.elements?.length) {
        email = email.data.elements.pop()['handle~'];
      }
      const userInfo = await getUserInfo(process.env['LINKEDIN_USER_PROFILE_URI'], access_token);
      const picture = userInfo.data.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
      const {localizedFirstName, localizedLastName} = userInfo.data;
      return { data: { localizedFirstName, localizedLastName, picture, ...email } };
    },
  },
};

