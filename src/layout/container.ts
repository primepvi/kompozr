import {
  ActionRowBuilder,
  SeparatorBuilder,
  TextDisplayBuilder,
  ContainerBuilder,
  FileBuilder,
  MediaGalleryBuilder,
  ButtonBuilder,
  SelectMenuBuilder,
  SectionBuilder,
} from "@discordjs/builders";

import { Colors, RGBTuple } from "discord.js";
import { createTextDisplay } from "../content/text-display";

export type ContainerComponentItem =
  | ActionRowBuilder<ButtonBuilder>
  | ActionRowBuilder<SelectMenuBuilder>
  | TextDisplayBuilder
  | SectionBuilder
  | string
  | SeparatorBuilder
  | FileBuilder
  | MediaGalleryBuilder;

export interface ContainerData {
  components: ContainerComponentItem[];
  spoiler?: boolean;
  color?: RGBTuple | keyof typeof Colors;
}

export function createContainer(data: ContainerData) {
  const color =
    data.color && typeof data.color == "string"
      ? Colors[data.color]
      : data.color;

  return new ContainerBuilder({
    components: data.components.map((component) => {
      if (typeof component == "string")
        return createTextDisplay(component).toJSON();
      return component.toJSON();
    }),
    spoiler: data.spoiler,
  }).setAccentColor(color);
}
