import * as Network from "expo-network";

export const networkDetails = async () => {
  const details = await Network.getNetworkStateAsync();
  console.log(details);
};
