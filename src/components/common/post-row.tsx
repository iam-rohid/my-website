import { FC, useMemo } from "react";
import Image from "next/future/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Props {
  slug: string;
  thumbnail: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  title: string;
  subtitle: string;
  readingTime?: string;
  category?: {
    name: string;
    url: string;
  };
  isDraft?: boolean;
  publishedAt: Date;
}

const PostRow: FC<Props> = (props) => {
  const {
    title,
    slug,
    category,
    subtitle,
    publishedAt,
    isDraft,
    thumbnail,
    readingTime,
  } = props;

  const postUrl = useMemo(() => `/blog/${slug}`, [slug]);

  return (
    <article>
      <div className="mb-2 flex gap-4 lg:gap-8">
        <div className="flex-1">
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            Publshed{" "}
            <b>
              {formatDistanceToNow(publishedAt, {
                addSuffix: true,
              })}
            </b>
          </p>

          <Link href={postUrl}>
            <a>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-50 md:text-2xl">
                {title}
              </h3>

              <p className="mt-3 line-clamp-2 max-md:hidden">{subtitle}</p>
            </a>
          </Link>
        </div>

        <Link href={postUrl}>
          <a className="block">
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt || `${title} - Thumbnail`}
              width={thumbnail.width || 128}
              height={thumbnail.height || 128}
              className="aspect-square w-20 rounded-lg object-cover md:w-32"
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {readingTime && <p>{readingTime}</p>}
        {category && (
          <Link href={category.url}>
            <a className="hover:text-gray-900 dark:hover:text-gray-50">
              {category.name}
            </a>
          </Link>
        )}
        {isDraft && (
          <p className="block rounded-full bg-gray-900 px-2 text-white dark:bg-gray-50 dark:text-gray-900">
            Draft
          </p>
        )}
      </div>
    </article>
  );
};

export default PostRow;
