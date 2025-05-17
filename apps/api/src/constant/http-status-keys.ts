import HTTPStatusCodes from "@/constant/http-status-codes";

const HTTPStatusKeys = Object.keys(
  HTTPStatusCodes,
) as (keyof typeof HTTPStatusCodes)[];

export default HTTPStatusKeys;
