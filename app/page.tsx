import { Header } from "./components/header";
import { LoginForm } from "./components/login-form";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid min-h-[calc(100vh-300px)] w-full place-content-center space-y-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold  dark:text-white">
            Inicio de sección
          </h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
