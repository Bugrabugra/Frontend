import { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photo: Photo
}

export default function ImgContainer({ photo }: Props) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div className="justify-self-center w-[250px]" style={{ gridRow: `span ${photoSpans}` }}>
      <Link href={photo.url} target="_blank" className="grid place-content-center">
        <div className="overflow-hidden rounded-xl group">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="group-hover:opacity-75"
            sizes="250px"
            placeholder="blur"
            blurDataURL={photo.blurredDataUrl}
          />
        </div>
      </Link>
    </div>);
}

