"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const fieldLabels = {
  email: "Email",
  password: "Password",
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://kap-test-backend.onrender.com/Kapapi/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              btoa(
                `abhinay@gmail.com:qwertyuiop`
              ),
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        Cookies.set("access", responseData.tokens.access);
        Cookies.set("refresh", responseData.tokens.refresh);

        console.log("Login successful");
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md py-8 px-12 shadow-lg border-2">
      <div className="f-center flex-col mb-6">
        <Logo />
        <h2>Login Your Account</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {["email", "password"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldLabels[fieldName]}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          fieldName === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : "text"
                        }
                        placeholder={`Enter ${fieldLabels[fieldName]}`}
                        {...field}
                      />
                      {fieldName === "password" && (
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 px-2 py-1 flex items-center cursor-pointer"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="f-center">
            <Button type="submit" className="px-7 py-4">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
