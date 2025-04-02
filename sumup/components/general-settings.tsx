"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { DropdownMenuCheckboxes } from "./settings-dropdown";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
    },
  });

  const saveFormData = useMutation(api.settings.saveFormData);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await saveFormData(values);
      alert("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" className=" " {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" className=" " {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="phone" className=" " {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          render={() => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <DropdownMenuCheckboxes />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
