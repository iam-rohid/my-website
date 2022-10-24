import { Category } from "contentlayer/generated";
import Link from "next/link";
import { FC } from "react";

export interface CategoriesListProps {
  categories: Category[];
  title?: string;
}

const CategoriesList: FC<CategoriesListProps> = (props) => {
  const { categories, title } = props;
  return (
    <section>
      <p className="mb-4 uppercase">{title || "Categories"}</p>
      <div>
        {categories.map((category) => (
          <Link href={`/categories/${category.slug}`} key={category._id}>
            <a className="flex py-1.5 hover:text-gray-900 dark:hover:text-gray-50">
              {category.title}
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
