import data from "@/data.json";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Avatar, Button } from "flowbite-react";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function ProductPage({
  params,
}: Readonly<{
  params: { productId: string };
}>) {
  const product = data.products.find(
    (product) => product.id === parseInt(params.productId),
  );
  const category = data.categories.find(
    (category) => category.id === product?.category_id,
  );
  const supplier = data.suppliers.find(
    (supplier) => supplier.id === product?.supplier_id,
  );
  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="col-span-3 row-span-1 flex w-full justify-between  gap-4 space-x-4 place-self-start p-4">
        <div className="flex items-center gap-4">
          <Button>Back</Button>
          <Avatar
            size={"lg"}
            img={product?.image}
            rounded={true}
            alt={`product ${product?.name}`}
          />
          <h2 className="text-5xl font-bold">
            {product?.name}{" "}
            <span className="font-thin">| {category?.name}</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span>Creado: {product?.created_at}</span>
          <Button color="red">Delete</Button>
        </div>
      </header>
      <hr className="col-span-full self-start" />
      <div className="col-span-3 mx-auto mt-10 flex gap-4">
        <div className="flex max-w-sm flex-col justify-center gap-4">
          <h3 className="text-center text-xl uppercase">Producto</h3>
          <img
            src={product?.image}
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
          <p>{product?.description}</p>
          <p>Precio: {currencyFormatter(product?.buy_price ?? 0)}</p>
          <p>Categoria: {category?.name}</p>
          <p>Proveedor: {supplier?.name}</p>
        </div>
      </div>
    </main>
  );
}
