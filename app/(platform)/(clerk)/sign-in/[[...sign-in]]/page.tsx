import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <SignIn path="/sign-in" routing="path" forceRedirectUrl="/select-org" />
  );
};

export default SignInPage;
