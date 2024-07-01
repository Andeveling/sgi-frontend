import data from "@/data.json";
import { Avatar, Button, Label, Select, TextInput } from "flowbite-react";
import { HiOutlinePhotograph } from "react-icons/hi";
export default async function EmployeePage({
  params,
}: Readonly<{
  params: { employeeId: string };
}>) {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(params.employeeId),
  );

  return (
    <main className="grid w-full grid-cols-3 items-start justify-start gap-2 p-2">
      <header className="col-span-3 row-span-1 flex w-full justify-between  gap-4 space-x-4 place-self-start p-4">
        <div className="flex items-center gap-4">
          <Button>Back</Button>
          <Avatar
            size={"lg"}
            img={employee?.photo}
            rounded={true}
            alt={`employee ${employee?.name}`}
          />
          <h2 className="text-5xl font-bold">
            {employee?.name}{" "}
            <span className="font-thin">| {employee?.role}</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span>Contratado desde: {employee?.hireDate}</span>
          <Button color="red">Delete</Button>
        </div>
      </header>
      <hr className="col-span-full self-start" />
      <div className="col-span-3 mx-auto mt-10 flex gap-4">
        <div className="flex max-w-sm flex-col justify-center gap-4">
          <h3 className="text-center text-xl uppercase">Imagen de perfil</h3>
          <img
            src={employee?.photo}
            alt="Foto del empleado"
            width={400}
            className="rounded-lg"
          />
          <Button className="bg-primary-500">
            <HiOutlinePhotograph className="size-6" />
            Cambiar imagen
          </Button>
        </div>
        <div className="">
          <h3 className="text-center text-xl uppercase">Informacion</h3>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="Rol" value="Rol del empleado" />
            </div>
            <Select id="countries" required>
              <option>Adminstrador</option>
              <option>Vendedor</option>
              <option>Almacenista</option>
            </Select>
          </div>
          <div className="">
            <h3 className="text-center text-xl uppercase">Detalles</h3>
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">Nombre</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder={employee?.name}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cellphone">Celular</Label>
                </div>
                <TextInput
                  id="cellphone"
                  type="text"
                  placeholder={employee?.cellphone}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Correo electrónico</Label>
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder={employee?.email}
                  required
                />
              </div>

              <Button type="submit">Actualizar</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
