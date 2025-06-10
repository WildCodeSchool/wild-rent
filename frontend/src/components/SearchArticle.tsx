import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PRODUCTS_BY_OPTIONS } from "../graphql/queries";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pictures: { url: string }[];
  product_options: { size: string; total_quantity: number }[];
  category: { id: string; title: string };
}

interface SearchResult {
  searchProductsByOptions: Product[];
}

interface SearchVariables {
  options: {
    name: string;
    categoryId?: string;
    productOption?: string;
  };
}

export function SearchArticle() {
  const [search, setSearch] = useState("");
  const [searchProducts, queryResult] = useLazyQuery<
    SearchResult,
    SearchVariables
  >(SEARCH_PRODUCTS_BY_OPTIONS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim().length >= 2) {
      searchProducts({
        variables: {
          options: { name: search },
        },
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full border pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <img src="assets/images/icons/loupe.png" alt="Recherche" className="" />
      </form>

      {queryResult.loading && <p className="mt-4">Chargement...</p>}
      {queryResult.error && (
        <p className="mt-4 text-red-500">{queryResult.error.message}</p>
      )}

      <div className="mt-4">
        {queryResult.data?.searchProductsByOptions
          .slice(0, 5)
          .map((product) => (
            <div
              key={product.id}
              className="border p-2 rounded mb-2 shadow-sm bg-white"
            >
              <p className="font-bold">{product.name}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p>{product.price} €</p>
              {product.pictures?.[0] && (
                <img
                  src={product.pictures[0].url}
                  alt={product.name}
                  className="w-20 h-20 object-cover mt-1"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
