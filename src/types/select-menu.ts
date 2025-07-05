import {
  APIMessageComponentEmoji,
  APISelectMenuDefaultValue,
  ChannelType,
  SelectMenuDefaultValueType,
} from "discord-api-types/v10";

export interface StringSelectMenuOptionData {
  value: string;
  label: string;
  default?: boolean;
  description?: string;
  emoji?: APIMessageComponentEmoji;
}

export interface StringSelectMenuData {
  cid: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  options?: StringSelectMenuOptionData[];
  placeholder?: string;
}

export type PopulatedSelectMenuData<
  T extends SelectMenuDefaultValueType = SelectMenuDefaultValueType
> = T extends SelectMenuDefaultValueType.Channel
  ? {
      defaultValues?: APISelectMenuDefaultValue<T>[];
      channelTypes?: ChannelType[];
    } & Omit<StringSelectMenuData, "options">
  : {
      defaultValues?: APISelectMenuDefaultValue<T>[];
    } & Omit<StringSelectMenuData, "options">;
