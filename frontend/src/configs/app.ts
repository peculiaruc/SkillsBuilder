// export const serverHost = 'http://127.0.0.1:3000';
export const serverHost = process.env.NODE_ENV !== 'production' ? 'https://opensourceteam3.onrender.com' : 'http://127.0.0.1:3000';

const basePath = `${serverHost}/api`;

const apiVersion = '/v1';

const apiPath = basePath + apiVersion;

const appName = 'SkillBuddy';

export const GOOGLE_CLIENT_ID = '693113486174-5df06paehqv1ddg50i68jhf9cfdcrbfn.apps.googleusercontent.com';

export const LINKEDIN_CLIENT_ID = '78c28r5uc9wxj8';

export const userCookie = 'YzY1MzUzNWUtNjM2OS';

export const defaultCookieExpires = 1; // in days

const appConfig = {
  basePath, apiVersion, apiPath, appName,
};

export default appConfig;
