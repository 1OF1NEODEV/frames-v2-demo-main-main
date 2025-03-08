export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 10)}...${address.slice(-4)}`;
};
