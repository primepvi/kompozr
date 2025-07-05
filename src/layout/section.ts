import { createTextDisplay } from "../content/text-display";

import {
  SectionBuilder,
  ButtonBuilder,
  TextDisplayBuilder,
  ThumbnailBuilder,
} from "discord.js";

export type SectionComponentItem = string | TextDisplayBuilder;

export interface SectionData {
  components: [
    SectionComponentItem,
    SectionComponentItem?,
    SectionComponentItem?
  ];
  acessory: ButtonBuilder | ThumbnailBuilder;
}

export function createSection(data: SectionData) {
  return new SectionBuilder({
    accessory: data.acessory.toJSON(),
    components: data.components
      .map((val) => {
        if (typeof val == "string") return createTextDisplay(val).toJSON();
        return val?.toJSON();
      })
      .filter((val) => typeof val == "object"),
  });
}
