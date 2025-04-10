import { ArticleFrom } from "../components/ArticleForm";

export const AdminArticle = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl">Nouvel article</h2>
        <ArticleFrom createOrUpdate="create" />
      </div>
    </>
  );
};
