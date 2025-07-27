import { Button } from "@/web/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/web/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import useSendFriendRequestMutation from "@/web/hooks/mutations/use-send-friend-request-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
});

export default function NewFriendRequestDialog() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useSendFriendRequestMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values.email);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">
          <IconCirclePlusFilled />
          Send new Request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send new Friend Request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="person@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose disabled={isPending}>Cancel</DialogClose>
              <Button type="submit" disabled={isPending}>
                <IconCirclePlusFilled />
                <p>Send</p>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
