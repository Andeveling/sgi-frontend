import { Header } from "./components/header";
import { LoginForm } from "./components/login-form";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full space-y-4">
        <h1 className="text-3xl font-bold  dark:text-white">
          Inicio de seccion
        </h1>
        <LoginForm />;
      </main>
    </>
  );
}
