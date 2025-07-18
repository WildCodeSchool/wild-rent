import CategoryForm from "../components/CategoryForm";

const AdminCategory = () => {
  return (
    <div>
      <section>
        <h2 className="font-bold text-3xl mb-6">Nouvelle catégorie</h2>
        <CategoryForm />
      </section>
      <section>
        <h2 className="font-bold text-3xl mb-6">Modifier une catégorie</h2>
      </section>
    </div>
  );
};
export default AdminCategory;
