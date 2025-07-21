import { useState } from "react";
import LoginForm from "../features/authentication/LoginForm";
import SignupForm from "../features/authentication/SignupForm";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60rem;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-yellow-50);
`;

const SignupLayout = styled.div`
  min-height: 100vh;
  max-width: 53rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <LoginLayout>
      <SignupLayout>
        <Logo />
        <Heading as="h4">
          {isSignup ? "Create your account" : "Log in to your account"}
        </Heading>

        {isSignup ? <SignupForm /> : <LoginForm />}

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <Button
            variation="primary"
            size="small"
            onClick={() => setIsSignup((s) => !s)}
          >
            {isSignup ? "Log in" : "Sign up"}
          </Button>
        </p>
      </SignupLayout>
    </LoginLayout>
  );
}

export default Login;
