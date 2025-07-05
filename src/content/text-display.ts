import { TextDisplayBuilder } from "discord.js";

export function createTextDisplay(...content: string[] | string[][]) {
  return new TextDisplayBuilder({
    content: content.flat(Infinity).join("\n"),
  });
}
