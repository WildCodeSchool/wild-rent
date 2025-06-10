import { ArticleForm } from "../components/ArticleForm";
import { SearchArticle } from "../components/SearchArticle";

export const AdminArticle = () => {
  return (
    <>
      <div>
        <section>
          <h2 className="font-bold text-3xl mb-6">Nouvel article</h2>
          <ArticleForm createOrUpdate="create" />
        </section>
        <section>
          <h2 className="font-bold text-3xl mb-6">Modifier un article</h2>
          <SearchArticle />
        </section>
      </div>
    </>
  );
};
