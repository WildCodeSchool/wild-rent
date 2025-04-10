import { ArticleForm } from "../components/ArticleForm";

export const AdminArticle = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl mb-6">Nouvel article</h2>
        <div className="space-y-4 w-lg">
          <ArticleForm createOrUpdate="create" />
        </div>
      </div>
    </>
  );
};
