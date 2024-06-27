"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function LoginForm() {
  return (
    <form className="flex max-w-xl flex-col gap-4">
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Ingresa tu correo" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="tucorreo@tuemail.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Ingresa tu contraseña" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
