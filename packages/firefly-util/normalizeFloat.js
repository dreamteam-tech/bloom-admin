export const normalizeFloat = value => {
  if (value === '0') {
    return '0';
  }

  if (!value || value < 0) {
    return '';
  }

  const temp = value.toString()
    .replace(/[^0-9.,]/g, '') // Allow only digits, dot and comma
    .replace(/,/g, '.') // Replace all comma to dot
    .replace(/^(.*)/g, '0$1') // Append leading zero
    .replace(/(\..*)\./g, '$1'); // Replace multiple dots

  const append = temp.charAt(temp.length - 1) === '.';
  const data = temp.split('.')
    .filter(String);

  let str = '';
  if (data.length > 1) {
    str = `${data.shift()}.${data.join('')}`;
  } else {
    str = data.join('');
  }

  let result = append ? `${str}.` : str;

  while (result.charAt(0) === '0' && result.charAt(1) !== '.') {
    result = result.slice(1);
  }

  return result;
};
