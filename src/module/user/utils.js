import { local } from 'easy-storage';
import { USER_LOCALSTORAGE_KEY } from './consts';

export function loadUser() {
  const user = local.get(USER_LOCALSTORAGE_KEY, null);
  if (user === null) {
    return null;
  }

  if (typeof user === 'object' && user.accessToken && user.refreshToken) {
    return user;
  }

  return null;
}

export function logoutUser() {
  local.remove(USER_LOCALSTORAGE_KEY);
}

export function isAdmin(user) {
  if (!user) {
    return false;
  }

  return user.permissions.indexOf('admin') > -1;
}

export function isGranted(user, permission) {
  if (!user) {
    return false;
  }

  if (Array.isArray(user.permissions) === false) {
    return false;
  }

  return user.permissions.indexOf(permission) > -1;
}

export function persistUser(data) {
  local.set(USER_LOCALSTORAGE_KEY, data);
}

export function setAuthHeaders(headers = {}, accessToken) {
  return {
    ...headers,
    authorization: `Bearer ${accessToken}`
  };
}
