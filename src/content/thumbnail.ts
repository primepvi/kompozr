import { ThumbnailBuilder } from "discord.js";

export interface ThumbnailData {
  url: string;
  spoiler?: boolean;
  description?: string;
}

export function createThumbnail(data: ThumbnailData) {
  return new ThumbnailBuilder({
    description: data.description,
    spoiler: data.spoiler,
  }).setURL(data.url);
}
