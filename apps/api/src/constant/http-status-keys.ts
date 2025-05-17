import HTTPStatusCodes from "@/api/constant/http-status-codes";

const HTTPStatusKeys = Object.keys(
  HTTPStatusCodes,
) as (keyof typeof HTTPStatusCodes)[];

export default HTTPStatusKeys;
