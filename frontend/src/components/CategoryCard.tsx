import { normalizeString } from "@/assets/utils";
import { Link } from "react-router-dom";

export interface categoryProps {
  id: number;
  title: string;
  image?: string;
}

const imageBasePath = "/assets/images/categories/";

function CategoryCard({ title, id, image }: categoryProps) {
  return (
    <Link
      to={`/products/category/${normalizeString(title)}`}
      className="drop-shadow-sm"
      state={{
        id: id,
        title: title,
        image: image,
      }}
    >
      <div className="drop-shadow-md">
        <div className="relative z-10 w-[280px] overflow-hidden p-2 px-4 py-6 text-center rounded-md font-title font-semibold text-xl">
          <img
            src={imageBasePath + image}
            className="absolute inset-0 object-cover w-full h-full"
            alt={title}
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="text-white relative z-10 font-light text-2xl">
            {title}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
