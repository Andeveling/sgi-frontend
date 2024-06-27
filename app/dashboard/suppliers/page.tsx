"use client";
import data from "@/data.json";
import {
  Button,
  Dropdown,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { CiFilter, CiSearch } from "react-icons/ci";

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="mt-2 flex w-full flex-col justify-between gap-2 md:flex-row">
        <form className="flex items-center">
          <Label htmlFor="simple-search" value="Search" className="sr-only" />
          <div className="relative w-full">
            <div className="pointer-events-none absolute  right-2 top-2 z-10 flex items-center pl-3">
              <CiSearch className="size-6 dark:text-white" />
            </div>
            <TextInput id="simple-search" type="text" placeholder="Search" />
          </div>
        </form>
        <div className="flex justify-between gap-2">
          <Button color="blue" onClick={() => console.log("data.products")}>
            + Añadir proveedor
          </Button>

          <Dropdown
            label={
              <span className="flex items-center gap-2">
                <CiFilter />
                Filtrar
              </span>
            }
            dismissOnClick={false}
            arrowIcon
          >
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Nombre</TableHeadCell>
            <TableHeadCell>Correo</TableHeadCell>
            <TableHeadCell>Teléfono</TableHeadCell>
            <TableHeadCell>Ciudad</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data.suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {supplier.name}
                </TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>

                <TableCell>{supplier.city}</TableCell>
                <TableCell>
                  <a
                    href="/"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
