export default function isLink(input) {
  if (typeof input !== 'string') return;
  // eslint-disable-next-line no-useless-escape
  const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return re.test(input.toLowerCase());
}
