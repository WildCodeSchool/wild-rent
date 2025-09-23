import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const AdminCategory = () => {
  return (
    <div>
      <section>
        <h2 className="font-bold text-3xl mb-6">Nouvelle catégorie</h2>
        <CategoryForm />
      </section>
      <section className="mt-12">
        <h2 className="font-bold text-3xl mb-6">Modifier une catégorie</h2>
        <CategoryList />
      </section>
    </div>
  );
};
export default AdminCategory;
