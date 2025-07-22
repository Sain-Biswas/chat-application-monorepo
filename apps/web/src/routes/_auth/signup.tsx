import { Button } from "@/web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import { signIn, signUp } from "@/web/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogleFilled, IconUserFilled } from "@tabler/icons-react";
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
import { toast } from "sonner";
import z from "zod";

const signupSchema = z.object({
  name: z.string().min(2, { error: "Please enter a name to show others." }),
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z.string(),
});

function SignUpRoute() {
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setLoading(true);

    const { data, error } = await signUp.email({
      ...values,
      callbackURL: "/chats",
    });

    if (error) toast.error(error.message);
    else toast.success(`${data.user.name} registered successfully.`);

    setLoading(false);
  }

  async function socialSignup() {
    setLoading(true);

    const { error } = await signIn.social({ provider: "google", callbackURL: "/chats" });

    if (error) toast.error(error.message);
    else toast.success(`User registered successfully.`);

    setLoading(false);
  }

  return (
    <section id="signup-form" className="flex max-w-96 flex-col gap-6">
      <article className="flex flex-col items-center justify-center gap-2 text-center">
        <TargetIcon className="size-10" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome Back
        </h3>
        <p className="text-muted-foreground">
          Enter your credentials to login to your account.
        </p>
      </article>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="peer ps-9"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <IconUserFilled size={16} aria-hidden="true" />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
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
            control={signupForm.control}
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
                    {isVisible
                      ? (
                          <EyeOffIcon size={16} aria-hidden="true" />
                        )
                      : (
                          <EyeIcon size={16} aria-hidden="true" />
                        )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Sign up
          </Button>
        </form>
      </Form>
      <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
        <span className="text-muted-foreground text-xs">Or</span>
      </div>
      <Button disabled={isLoading} onClick={socialSignup}>
        <IconBrandGoogleFilled />
        <p>Sign up using Google</p>
      </Button>
      <div className="flex items-center justify-center">
        <p>Already have an account?</p>
        <Button variant="link">
          <Link to="/signup">signin</Link>
        </Button>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_auth/signup")({
  component: SignUpRoute,
});
