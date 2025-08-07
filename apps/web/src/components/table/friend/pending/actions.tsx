import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/web/components/ui/alert-dialog";
import { Button } from "@/web/components/ui/button";
import useAcceptFriendRequestMutation from "@/web/hooks/mutations/use-accept-friend-request-mutation";
import useRejectFriendRequestMutation from "@/web/hooks/mutations/use-reject-friend-request-mutation";
import { IconSquareRoundedCheckFilled, IconSquareRoundedXFilled } from "@tabler/icons-react";
import type { TPendingFriendList } from "./columns";

interface FriendRequestPendingActionsProps {
  data: TPendingFriendList;
}

export default function FriendRequestPendingActions({ data }: FriendRequestPendingActionsProps) {
  "use no memo";

  const { mutate: acceptMutate, isPending: isAcceptPending } = useAcceptFriendRequestMutation();
  const { mutate: rejectMutate, isPending: isRejectPending } = useRejectFriendRequestMutation();

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-8" variant="outline">
            <IconSquareRoundedCheckFilled size={16} />
            Accept
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <IconSquareRoundedCheckFilled className="opacity-80" size={34} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to accept this friend request?
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isAcceptPending} onClick={() => acceptMutate({ friendID: data.sentFrom.id, requestID: data.id })}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-8" variant="outline">
            <IconSquareRoundedXFilled size={16} />
            Reject
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
                Are you sure you want to reject this friend request?
                <p className="font-bold text-destructive">This action can&apos;t be undone.</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isRejectPending} onClick={() => rejectMutate({ friendID: data.sentFrom.id, requestID: data.id })}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
