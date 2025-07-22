import { Button } from "@/web/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/web/components/ui/dialog";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export default function NewFriendRequestDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">
          <IconCirclePlusFilled />
          Send new Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        jhvuvhv
      </DialogContent>
    </Dialog>
  );
}
