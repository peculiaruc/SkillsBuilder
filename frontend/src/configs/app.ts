const basePath = 'http://skillbuddy-env.eba-74fcefym.us-east-1.elasticbeanstalk.com/api';

const apiVersion = '/v1';

const apiPath = basePath + apiVersion;

const appName = 'SkillBuddy';

const appConfig = {
  basePath, apiVersion, apiPath, appName,
};

export default appConfig;
