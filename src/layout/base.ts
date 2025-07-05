import {
  ActionRowBuilder,
  SeparatorBuilder,
  TextDisplayBuilder,
  FileBuilder,
  MediaGalleryBuilder,
  ButtonBuilder,
  SelectMenuBuilder,
  SectionBuilder,
} from "@discordjs/builders";

import { createTextDisplay } from "../content/text-display";

export type BaseComponentItem =
  | ActionRowBuilder<ButtonBuilder>
  | ActionRowBuilder<SelectMenuBuilder>
  | SectionBuilder
  | TextDisplayBuilder
  | string
  | SeparatorBuilder
  | FileBuilder
  | MediaGalleryBuilder;

export function createBase(
  ...components: BaseComponentItem[] | BaseComponentItem[][]
) {
  return components.flat(Infinity).map((component) => {
    if (typeof component == "string") return createTextDisplay(component);
    return component;
  });
}
