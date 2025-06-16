// components/ForgotPasswordForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex px-8">
        <div className="max-w-md w-full mx-auto mt-12 bg-gray-100 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full hover:bg-red-600">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Link
        href="/"
        className="block text-center mt-5 font-semibold hover:underline text-blue-600"
      >
        Go back Home
      </Link>
    </>
  );
}
