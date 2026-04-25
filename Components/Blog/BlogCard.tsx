import Image from "next/image";
import Link from "next/link";

type Props = {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
};

export default function BlogCard({ id, slug, title, category, description, image }: Props) {
    const linkHref = `/blog/${slug || id}`;

    return (
        <div className="border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 bg-card hover:shadow-2xl hover:shadow-primary/5 group">
            <div className="relative w-full h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {category}
                </div>
            </div>

            <div className="p-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2">{title}</h3>

                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 line-clamp-2 opacity-80">{description}</p>

                <Link href={linkHref} className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-2 hover:gap-4 transition-all">
                    READ MORE <span className="text-primary">→</span>
                </Link>
            </div>
        </div>
    );
}