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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const router = useRouter();

  useEffect(() => {
    validate();
  }, [email, password]);

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    // TODO :  to api auth/login remove bellow router.push
    router.push("/");

    let res;
    // await signIn("credentials", {
    //   email,
    //   password,
    //   callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
    //   redirect: false,
    // });
    setIsLoading(false);
    
    if (res?.ok) {
      // toastsuccess
      console.log("success");
      router.push("/");
      return;
    } else {
      // Toast failed
      setError("Failed! Check you input and try again.");
      // return;
      console.log("Failed", res);
    }
    return res;
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
          p="1rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
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
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
