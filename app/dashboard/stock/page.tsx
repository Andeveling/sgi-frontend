"use client";
import data from "@/data.json";
import {
  Avatar,
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

export default function StockPage() {
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
          {/* <Button color="blue" onClick={() => console.log("data.products")}>
            + Crear Empleado
          </Button> */}

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
            <TableHeadCell>Imagen</TableHeadCell>
            <TableHeadCell>Nombre</TableHeadCell>
            <TableHeadCell>Inventario</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data.stock.map((item) => {
              const product = data.products.find(
                (product) => product.id === item.product_id,
              );
              return (
                <TableRow
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="flex whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Avatar img={product?.image} rounded />
                  </TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <a
                      href="/"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
