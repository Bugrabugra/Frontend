import { ImageResults, ImagesSchemaWithPhotos } from "@/models/Images";
import env from "@/lib/env";

export default async function fetchImages(url: string): Promise<ImageResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY
      }
    });

    if (!res.ok) {
      throw new Error("Fetch images error!");
    }

    const imagesResults: ImageResults = await res.json();

    console.log(imagesResults);

    // parse data with Zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) {
      return undefined;
    }

    return imagesResults;
  } catch (error) {
    // will show in terminal console
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}
