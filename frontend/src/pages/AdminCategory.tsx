import CategoryAddForm from "@/components/CategoryAddForm";
import CategoryUpdateForm from "@/components/CategoryUpdateForm";

const AdminCategory = () => {
  return (
    <div>
      <section>
        <h2 className="font-bold text-3xl mb-6">Nouvelle catégorie</h2>
        <CategoryAddForm />
      </section>
      <section className="mt-12">
        <h2 className="font-bold text-3xl mb-6">Modifier une catégorie</h2>
        <CategoryUpdateForm />
      </section>
    </div>
  );
};
export default AdminCategory;
