/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { validateEmail } from "@/common/utils/index";
import AuthLayout from "@/components/layout/AuthLayout";
import { HiUserCircle, HiLockOpen } from "react-icons/hi";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("test123");
  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const router = useRouter();
  const { pending } = useFormStatus();

  useEffect(() => {
    validate();
  }, [email, password]);

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('data >', data);
      setIsLoading(false);
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24};`; // Set a cookie
        setInterval(() => {
          window.location.href = '/admin';
          router.push("/admin");
        }, 2000);
        return;
      } else {
        console.log("Failed", data);
        setError("Failed! something not working properly.");
      }
    } catch (error) {
      console.log("Failed", error);
      setError("Failed! server error.");
    }
  }

  function validate() {
    let emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      setEmailInputError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordInputError(true);
    } else {
      setEmailInputError(false);
      setPasswordInputError(false);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Stack
          spacing={4}
          px="1rem"
          py="2rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
          borderRadius={"1rem"}
        >
          {error && (
            <div className="flex w-full py-3 p-1 rounded-md bg-red-500 text-white">
              {error}
            </div>
          )}
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<HiUserCircle color="gray.300" />}
              />
              <Input
                required
                type="email"
                placeholder="input email address here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                // color="gray.300"
                children={<HiLockOpen color="gray.300" />}
              />
              <Input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText textAlign="right">
              <Link>forgot password?</Link>
            </FormHelperText>
          </FormControl>
          <Button
            borderRadius={0}
            variant="solid"
            colorScheme="blue"
            width="full"
            type="submit"
            aria-disabled={pending}
            disabled={isLoading ? true : false}
          >
            {isLoading || pending ? "Loading..." : "LogIn"}
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
