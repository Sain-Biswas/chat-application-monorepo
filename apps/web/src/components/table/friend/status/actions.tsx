import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/web/components/ui/alert-dialog";
import { Button } from "@/web/components/ui/button";
import { IconSquareRoundedXFilled, IconTrashFilled } from "@tabler/icons-react";
import client from "@zaptalk/api-client/index.js";
import { toast } from "sonner";
import type { TSendRequestStatusList } from "./columns";

interface FriendRequestStatusActionsProps {
  data: TSendRequestStatusList;
}

export default function FriendRequestStatusActions({ data }: FriendRequestStatusActionsProps) {
  "use no memo";

  async function cancelFriendRequestHandler() {
    const response = await client.api.friends.request.cancel.$post({
      json: {
        friendID: data.sentTo.id,
        requestID: data.id,
      },
    });

    if (response.ok) {
      const parsed = await response.json();
      toast.success(parsed.message, { description: parsed.detail });
    }

    else {
      const parsed = await response.json();
      toast.error(parsed.error.message, { description: parsed.error.detail });
    }
  }

  async function deleteFriendRequestHandler(){
    const response = await client.api.friends.request.$delete({
      json: {
        friendID: data.sentTo.id,
        requestID: data.id
      }
    })

    if (response.ok) {
      const parsed = await response.json();
      toast.success(parsed.message, { description: parsed.detail });
    }

    else {
      const parsed = await response.json();
      toast.error(parsed.error.message, { description: parsed.error.detail });
    }
  }

  if (data.status === "pending")
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-8" variant="outline">
            <IconSquareRoundedXFilled size={16} />
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <IconSquareRoundedXFilled className="opacity-80" size={34} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your friend request? The request to other party will
                be removed.
                <p className="font-bold text-destructive">This action can&apos;t be undone.</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={cancelFriendRequestHandler}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-8" variant="outline">
            <IconTrashFilled size={16} />
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <IconTrashFilled className="opacity-80" size={34} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your friend request? The request to other party will
                be removed.
                <p className="font-bold text-destructive">This action can&apos;t be undone.</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteFriendRequestHandler}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}
