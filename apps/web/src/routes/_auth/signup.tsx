import { Button } from "@/web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import { signIn, signUp } from "@/web/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandGoogleFilled,
  IconLoader2,
  IconUserFilled,
} from "@tabler/icons-react";
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
  // eslint-disable-next-line no-use-before-define
  const params = Route.useSearch();

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
      callbackURL: params.redirect || "/chats",
    });

    if (error) toast.error(error.message);
    else toast.success(`${data.user.name} registered successfully.`);

    setLoading(false);
  }

  async function socialSignup() {
    setLoading(true);

    const { error } = await signIn.social({
      provider: "google",
      callbackURL: params.redirect || "/chats",
    });

    if (error) toast.error(error.message);
    else toast.success(`User registered successfully.`);

    setLoading(false);
  }

  return (
    <section
      id="signup-form"
      className="m-auto h-fit w-full max-w-92 space-y-6"
    >
      <article className="flex flex-col items-center">
        <Link to="/" aria-label="go home">
          <TargetIcon />
        </Link>
        <h1 className="mt-4 mb-1 text-xl font-semibold">
          Create a Zaptalk Account
        </h1>
        <p>Welcome! Create an account to get started</p>
      </article>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Name</FormLabel>
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
                <FormLabel className="text-sm">Email</FormLabel>
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
                <FormLabel className="text-sm">Password</FormLabel>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading && <IconLoader2 className="size-4 animate-spin" />}
            Continue
          </Button>
        </form>
      </Form>

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">Or continue With</span>
        <hr className="border-dashed" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={socialSignup}
        disabled={isLoading}
      >
        {isLoading && <IconLoader2 className="size-4 animate-spin" />}
        <IconBrandGoogleFilled className="size-4" />
        <span>Google</span>
      </Button>

      <div className="text-accent-foreground text-center text-sm">
        Have an account ?
        <Button variant="link" asChild className="px-2">
          <Link to="/signin" search={{ redirect: params.redirect }}>
            Sign In
          </Link>
        </Button>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_auth/signup")({
  component: SignUpRoute,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});
