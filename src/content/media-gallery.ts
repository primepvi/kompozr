import { MediaGalleryBuilder, MediaGalleryItemBuilder } from "discord.js";

export interface MediaGalleryItemData {
  url: string;
  spoiler?: boolean;
  description?: string;
}

export function createMediaGallery(
  ...medias: MediaGalleryItemData[] | MediaGalleryItemData[][]
) {
  medias = medias.flat(Infinity) as MediaGalleryItemData[];

  return new MediaGalleryBuilder().addItems(
    medias.map((media) =>
      new MediaGalleryItemBuilder({
        description: media.description,
        spoiler: media.spoiler,
      }).setURL(media.url)
    )
  );
}
