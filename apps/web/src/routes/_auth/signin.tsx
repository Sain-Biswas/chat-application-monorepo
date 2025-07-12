import { Button } from "@/web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AtSignIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  TargetIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const signinSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z.string(),
});

function SignInRoute() {
  const signinForm = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isVisible, setVisible] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof signinSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <section id="signin-form" className="flex max-w-96 flex-col gap-6">
      <article className="flex flex-col items-center justify-center gap-2 text-center">
        <TargetIcon className="size-10" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome Back
        </h3>
        <p className="text-muted-foreground">
          Enter your credentials to login to your account.
        </p>
      </article>
      <Form {...signinForm}>
        <form
          onSubmit={signinForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={signinForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="peer ps-9"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <AtSignIcon size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signinForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="peer ps-9 pe-9"
                    />
                  </FormControl>
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <LockIcon size={16} aria-hidden="true" />
                  </div>
                  <Button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    variant="ghost"
                    onClick={() => setVisible((current) => !current)}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign in</Button>
        </form>
      </Form>
      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
        <span className="text-muted-foreground text-xs">Or</span>
      </div>
      <Button>
        <IconBrandGoogleFilled />
        <p>Sign in using Google</p>
      </Button>
      <div>
        Don&apos;t have an account?{" "}
        <Button variant="link">
          <Link to="/signup">signup</Link>
        </Button>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_auth/signin")({
  component: SignInRoute,
});
