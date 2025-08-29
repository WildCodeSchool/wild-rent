import {
  useApprovedOrderByIdMutation,
  useDeleteOrderByIdMutation,
  useGetAllOrdersAndDetailsQuery,
} from "@/generated/graphql-types";
import { useEffect, useState } from "react";

const AdminOrder = () => {
  const { loading, error, data } = useGetAllOrdersAndDetailsQuery();
  const [deleteOrder] = useDeleteOrderByIdMutation();
  const [approvedOrderById] = useApprovedOrderByIdMutation();

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "CANCELED"
  >("ALL");
  const [emailSearch, setEmailSearch] = useState("");

  const handleDelete = async (orderId: number) => {
    try {
      await deleteOrder({
        variables: { deleteOrderId: orderId },
        refetchQueries: ["GetAllOrdersAndDetails"],
      });
      console.log("Commande supprimée ✅");
    } catch (err) {
      console.error("Erreur de suppression ❌", err);
    }
  };

  const handleChange = async (orderId: number, status: string) => {
    try {
      await approvedOrderById({
        variables: { data: { id: orderId, status } },
        refetchQueries: ["GetAllOrdersAndDetails"],
      });
      console.log("Statut modifié ✅");
    } catch (err) {
      console.error("Erreur lors du changement de statut ❌", err);
    }
  };

  const filteredOrders = data?.getAllOrders.filter((order) => {
    const matchStatus = statusFilter === "ALL" || order.status === statusFilter;
    const matchEmail = order.user.email
      .toLowerCase()
      .includes(emailSearch.toLowerCase());
    return matchStatus && matchEmail;
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue...</p>;

  return (
    <>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Filtrer par statut
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border px-3 py-1 rounded"
          >
            <option value="ALL">Tous</option>
            <option value="PENDING">En attente</option>
            <option value="APPROVED">Approuvés</option>
            <option value="CANCELED">Annulés</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Rechercher par email
          </label>
          <input
            type="text"
            placeholder="client@email.com"
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className="border px-3 py-1 rounded w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Produits</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Prix total</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Commandé le</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{order.id}</td>
                <td className="px-4 py-3 text-sm">{order.user.email}</td>

                <td className="px-4 py-3 text-sm">
                  {order.products_in_order.map((item, i) => (
                    <div key={i} className="mb-1">
                      {item.quantity}× {item.productOption.product.name} (
                      {item.productOption.size})
                    </div>
                  ))}
                </td>

                <td className="px-4 py-3 text-sm">
                  <div>
                    <strong>Début : </strong>
                    {new Date(order.rental_start_date).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Fin : </strong>
                    {new Date(order.rental_end_date).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-4 py-3 text-sm font-semibold text-green-600">
                  {order.total_price.toFixed(2)} €
                </td>

                <td className="px-4 py-3 text-sm uppercase">{order.status}</td>

                <td className="px-4 py-3 text-sm">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-sm">
                  {(() => {
                    switch (order.status) {
                      case "PENDING":
                        return (
                          <button
                            onClick={() => handleChange(order.id, "APPROVED")}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition mr-1"
                          >
                            Approuver
                          </button>
                        );
                      case "APPROVED":
                        return (
                          <button
                            onClick={() => handleChange(order.id, "CANCELED")}
                            className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition mr-1"
                          >
                            Annuler
                          </button>
                        );
                      case "CANCELED":
                        return (
                          <button
                            onClick={() => handleChange(order.id, "PENDING")}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition mr-1"
                          >
                            Restaurer
                          </button>
                        );
                      default:
                        return null;
                    }
                  })()}

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrder;
