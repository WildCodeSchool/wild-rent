import { ArticleForm } from "../components/ArticleForm";

export const AdminArticle = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl mb-6">Nouvel article</h2>
        <div>
          <ArticleForm createOrUpdate="create" />
        </div>
      </div>
    </>
  );
};
