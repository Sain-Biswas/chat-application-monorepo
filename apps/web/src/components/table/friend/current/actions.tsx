import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/web/components/ui/alert-dialog";
import { Button } from "@/web/components/ui/button";
import { IconTrashFilled } from "@tabler/icons-react";
import client from "@zaptalk/api-client/index.js";
import { toast } from "sonner";
import type { TCurrentFriendList } from "./columns";

interface CurrentFriendListActionsProps {
  data: TCurrentFriendList;
}

export default function CurrentFriendListActions({ data }: CurrentFriendListActionsProps) {
  async function endFriendshipHandler() {
    const response = await client.api.friends.$delete({
      json: {
        friendID: data.id,
        relationshipID: data.relationshipId,
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
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-8" variant="outline">
           <IconTrashFilled size={16} />
          End Friendship
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
              Are you sure you want to end your friendship? All your data will
              be removed.
              <p className="font-bold text-destructive">This action can&apos;t be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={endFriendshipHandler}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
