import Image, { ImageProps } from "next/image";

interface SEOImageProps extends ImageProps {
  alt: string; // Enforce alt text
  caption?: string;
  titleAttr?: string;
}

export default function SEOImage({ alt, caption, titleAttr, ...props }: SEOImageProps) {
  return (
    <figure className="w-full h-full relative group">
      <Image
        {...props}
        alt={alt}
        title={titleAttr || alt}
        className={`transition-transform duration-500 ${props.className || ""}`}
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground font-medium uppercase tracking-widest text-center opacity-60 group-hover:opacity-100 transition-opacity">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
