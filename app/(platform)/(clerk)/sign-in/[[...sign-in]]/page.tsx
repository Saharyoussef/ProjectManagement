import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <SignIn path="/sign-in" routing="path" forceRedirectUrl="/select-org" />
  );
};

export default SignInPage;
/*path="/sign-in" : Spécifie le chemin de l'URL sur lequel le formulaire de connexion sera accessible.
routing="path" : Indique que le routage doit être basé sur le chemin de l'URL. 
forceRedirectUrl="/select-org" : Définit l'URL vers laquelle l'utilisateur sera redirigé après une connexion réussie, 
même si une autre URL de redirection est configurée dans Clerk. */
