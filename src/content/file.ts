import { FileBuilder } from "discord.js";

export interface FileData {
  url: string;
  spoiler?: boolean;
}

export function createFile(data: FileData) {
  return new FileBuilder({
    spoiler: data.spoiler,
  }).setURL(data.url);
}
