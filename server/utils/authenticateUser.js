import jwt from 'jsonwebtoken';

import validateInput from './validateInput';

const SingleSignOnKey = 'SingleSignOnKey';

export default async function authenticateUser(request, queryData) {
  const { ssoToken } = queryData;
  try {
    const userData = jwt.verify(ssoToken, SingleSignOnKey);

    if (userData) {
      return Promise.resolve();
    }

    if (!userData.id) {
      throw new Error('Missing id in user data');
    } else if (userData.email && !validateInput.email(userData.email)) {
      throw new Error('Invalid email in user data');
    } else if (!userData.nayme) {
      throw new Error('Missing name in user data');
    }
  } catch (ex) {
    throw new Error('Failed to verify token');
  }

  delete queryData.ssoToken;
}

module.exports = authenticateUser;
