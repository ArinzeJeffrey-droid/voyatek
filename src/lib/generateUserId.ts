export default function generateUserId() {
  return `USR-${Math.floor(Math.random() * 1000)}`;
}
