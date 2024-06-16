import Link from "next/link";

export default function Card({
  title,
  description,
  link,
  image,
  slug,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
  slug: string;
}) {
  return (
    <section className="overflow-hidden border border-slate-600 rounded bg-black z-10">
      <img
        src={image}
        alt={title}
        className="object-cover w-full aspect-video object-center"
      />
      <div className="my-4 flex flex-col justify-center items-center">
        <h2 className="text-center text-2xl md:text-xl">
          <a
            href={link}
            target="_blank"
            className="inline-block"
            rel="noopener noreferrer"
          >
            <span className="pb-2 border-b border-white px-4 md:px-2">
              {title}
            </span>
          </a>
        </h2>
        <p className="mt-5">{description}</p>
        <div className="flex gap-2 mt-4">
          <Link
            href={`/showcase/${slug}`}
            className="rounded-full border border-white btnshine sm"
          >
            詳細
          </Link>
          <a
            href={link}
            target="_blank"
            className="rounded-full border border-white btnshine sm"
            rel="noopener noreferrer"
          >
            サービス
          </a>
        </div>
      </div>
    </section>
  );
}
