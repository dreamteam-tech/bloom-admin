import md5 from 'blueimp-md5';

export default (email, size = 80) => {
  // MD5 function brought to you by blueimp
  // https://github.com/blueimp/JavaScript-MD5
  const hash = md5(email.trim().toLowerCase());

  return `https://www.gravatar.com/avatar/${hash}.jpg?s=${size}`;
}
