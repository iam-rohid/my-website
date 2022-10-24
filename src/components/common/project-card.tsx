import { Project } from "contentlayer/generated";
import Image from "next/future/image";
import Link from "next/link";
import { FC } from "react";
import { MdOpenInNew } from "react-icons/md";

const ProjectCard: FC<{
  project: Project;
}> = ({ project }) => {
  return (
    <article key={project._id} className="text-center">
      <Link href={`/projects/${project.slug}`}>
        <a className="mx-auto mb-6 block">
          <Image
            src={project.icon.url}
            alt={project.icon.alt}
            width={project.icon.width}
            height={project.icon.height}
            className="mx-auto aspect-square w-32 rounded-3xl object-cover shadow-xl"
          />
        </a>
      </Link>
      <Link href={`/projects/${project.slug}`}>
        <a className="text-gray-900 dark:text-gray-50">
          <h3 className="mb-2 text-xl font-medium">{project.title}</h3>
        </a>
      </Link>

      <p className="my-2 line-clamp-3">{project.excerpt}</p>

      <div className="flex flex-wrap justify-center gap-4">
        {project.availableOn.web && (
          <Link href={project.availableOn.web.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Web
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.availableOn.ios && (
          <Link href={project.availableOn.ios.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              iOS
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.availableOn.android && (
          <Link href={project.availableOn.android.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Android
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.availableOn.macOs && (
          <Link href={project.availableOn.macOs.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Mac
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.availableOn.windows && (
          <Link href={project.availableOn.windows.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Windows
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.availableOn.linux && (
          <Link href={project.availableOn.linux.url}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Linux
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
        {project.repoUrl && (
          <Link href={project.repoUrl}>
            <a
              target="_blank"
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-50"
            >
              Source
              <MdOpenInNew className="inline" />
            </a>
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
