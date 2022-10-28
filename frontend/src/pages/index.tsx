import BackgroundLayout from '../layout/BackgroundLayout';
import authroutes from './auth/routes';

export default [{
  element: <BackgroundLayout />,
  children: [
    authroutes,
  ],

}];
