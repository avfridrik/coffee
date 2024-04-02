import React, { useState, useEffect } from "react";
import { DispenseModal } from "./Modals/Dispense";

export type Product = {
  name?: string;
  text?: string;
  id?: number;
  price?: number;
  image?: string;
};

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [product, setProduct] = React.useState<Product>();
  React.useEffect(() => {
    fetch("http://localhost:3001/product")
      .then((response) => response.json())
      .then((data: Product[]) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const showModal = (product: Product) => {
    setProduct(product);
    (
      document.getElementById("dispense-modal") as HTMLDialogElement
    ).showModal();
  };

  return (
    <main className="min-h-screen m-10">
      <DispenseModal item={product} />
      <div className="from-yellow-400 to-yellow-700 bg-clip-text text-transparent bg-gradient-to-r text-8xl text-center font-extrabold mb-10">
        Choose your drink
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((p, key) => {
          const product: Product = p;
          return (
            <div
              key={key}
              onClick={() => showModal(product)}
              className="card card-compact bg-white shadow-xl cursor-pointer"
            >
              <div className="">
                <div className="card-body">
                  <figure className="-mb-10 -mt-5">
                    <img
                      src={product.image ?? ""}
                      alt={product.name ?? ""}
                      width={500}
                      height={500}
                    />
                  </figure>
                  <div className="flex flex-col px-6 gap-y-4 text-center flex-auto">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-3xl card-title from-[#EDC075] to-[#3F3030] bg-clip-text text-transparent bg-gradient-to-r text-center font-extrabold justify-center">
                        {product.name}
                      </h3>
                      <h4 className="text-4xl uppercase font-bold text-[#3F3030]">
                        ${product.price}
                      </h4>
                    </div>
                    <p className="text-center text-gray-500 text-sm font-normal h-20">
                      {product.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
