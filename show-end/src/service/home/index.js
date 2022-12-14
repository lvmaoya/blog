import sjRequest from "..";

export function getInterestThing() {
  return sjRequest.get({ url: "/getIntersetThingList" });
}
