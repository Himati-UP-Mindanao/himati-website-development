import { HimatiUser } from "@/payload-types";

export const getUserFullName = (user : HimatiUser) => {
  return `${user["first-name"]} ${user["last-name"]}`;
}