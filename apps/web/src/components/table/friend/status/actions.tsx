import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/web/components/ui/alert-dialog";
import { Button } from "@/web/components/ui/button";
import useCancelFriendRequestMutation from "@/web/hooks/mutations/use-cancel-friend-request-mutation";
import useDeleteFriendRequestMutation from "@/web/hooks/mutations/use-delete-friend-request-mutation";
import { IconSquareRoundedXFilled, IconTrashFilled } from "@tabler/icons-react";
import type { TSendRequestStatusList } from "./columns";

interface FriendRequestStatusActionsProps {
  data: TSendRequestStatusList;
}

export default function FriendRequestStatusActions({ data }: FriendRequestStatusActionsProps) {
  "use no memo";

  const { mutate: cancelMutate, isPending: isCancelPending } = useCancelFriendRequestMutation();

  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteFriendRequestMutation();

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
            <AlertDialogAction disabled={isCancelPending} onClick={() => cancelMutate({ friendID: data.sentTo.id, requestID: data.id })}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-8" variant="outline">
          <IconTrashFilled size={16} />
          Delete
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
              Are you sure you want to delete info about your friend request?
              <p className="font-bold text-destructive">This action can&apos;t be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeletePending} onClick={() => deleteMutate({ friendID: data.sentTo.id, requestID: data.id })}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
