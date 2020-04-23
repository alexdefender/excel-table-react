export default function isUrlValid(url) {
  if (typeof url !== 'string') return;
  const regexQuery =
    '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
  const reObj = new RegExp(regexQuery, 'i');

  return reObj.test(url);
}
