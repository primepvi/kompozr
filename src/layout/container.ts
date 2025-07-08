import {
  ActionRowBuilder,
  SeparatorBuilder,
  TextDisplayBuilder,
  ContainerBuilder,
  FileBuilder,
  MediaGalleryBuilder,
  ButtonBuilder,
  SectionBuilder,
  StringSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder,
  MentionableSelectMenuBuilder,
} from "@discordjs/builders";

import { Colors, RGBTuple } from "discord.js";
import { createTextDisplay } from "../content/text-display";

export type ContainerComponentItem =
  | ActionRowBuilder<ButtonBuilder>
  | ActionRowBuilder<StringSelectMenuBuilder>
  | ActionRowBuilder<ChannelSelectMenuBuilder>
  | ActionRowBuilder<RoleSelectMenuBuilder>
  | ActionRowBuilder<MentionableSelectMenuBuilder>
  | TextDisplayBuilder
  | SectionBuilder
  | string
  | SeparatorBuilder
  | FileBuilder
  | MediaGalleryBuilder;

export interface ContainerData {
  components: ContainerComponentItem[];
  spoiler?: boolean;
  color?: RGBTuple | keyof typeof Colors | number | `#${number}`;
}

export function createContainer(data: ContainerData) {
  const color =
    data.color && typeof data.color == "string" && !data.color.startsWith("#")
      ? Colors[data.color as keyof typeof Colors]
      : data.color;

  return new ContainerBuilder({
    components: data.components.map((component) => {
      if (typeof component == "string")
        return createTextDisplay(component).toJSON();
      return component.toJSON();
    }),
    spoiler: data.spoiler,
  }).setAccentColor(color as RGBTuple);
}
