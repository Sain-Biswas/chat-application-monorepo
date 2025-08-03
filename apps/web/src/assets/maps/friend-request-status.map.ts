import { IconClockHour12Filled, IconSquareRoundedCheckFilled, IconSquareRoundedMinusFilled, IconSquareRoundedXFilled } from "@tabler/icons-react";

const friendRequestStatusMap: Record<"accepted" | "pending" | "rejected" | "canceled", {
  title: string;
  icon: typeof IconSquareRoundedCheckFilled;
}> = {
  accepted: {
    title: "Accepted",
    icon: IconSquareRoundedCheckFilled,
  },
  canceled: {
    title: "Canceled",
    icon: IconSquareRoundedMinusFilled,
  },
  rejected: {
    title: "Rejected",
    icon: IconSquareRoundedXFilled,
  },
  pending: {
    title: "Pending",
    icon: IconClockHour12Filled,
  },
} as const;

export const friendRequestStatusMapKeys = ["accepted", "pending", "rejected", "canceled"];

export default friendRequestStatusMap;
