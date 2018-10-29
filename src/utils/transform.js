export default function transform(value) {
  let id = null;

  if (value.length === 36) {
    id = value.replace(/-/g, '')
  } else if (value.length === 32) {
    id = value.slice(0, 8) + '-' +
    value.slice(8, 12) + '-' +
    value.slice(12, 16) + '-' +
    value.slice(16, 20) + '-' +
    value.slice(20);
  }

  return id;
}
