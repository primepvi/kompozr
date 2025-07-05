import {
  ActionRowBuilder,
  AnyComponentBuilder,
  APISelectMenuDefaultValue,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  RoleSelectMenuBuilder,
  SelectMenuDefaultValueType,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
} from "discord.js";
import { createActionRow } from "../layout/action-row";
import {
  PopulatedSelectMenuData,
  StringSelectMenuData,
} from "../types/select-menu";

function createStringSelectMenu(data: StringSelectMenuData) {
  const menu = new StringSelectMenuBuilder({
    custom_id: data.cid,
    disabled: data.disabled,
    max_values: data.max,
    min_values: data.min,
    options: data.options,
    placeholder: data.placeholder,
  });

  return createActionRow(menu);
}

function createPopulatedSelectMenu(
  type: SelectMenuDefaultValueType.Channel,
  data: PopulatedSelectMenuData<SelectMenuDefaultValueType.Channel>
): ActionRowBuilder<ChannelSelectMenuBuilder>;

function createPopulatedSelectMenu(
  type: SelectMenuDefaultValueType.Role,
  data: PopulatedSelectMenuData<SelectMenuDefaultValueType.Role>
): ActionRowBuilder<RoleSelectMenuBuilder>;

function createPopulatedSelectMenu(
  type: SelectMenuDefaultValueType.User,
  data: PopulatedSelectMenuData<SelectMenuDefaultValueType.User>
): ActionRowBuilder<UserSelectMenuBuilder>;

function createPopulatedSelectMenu(
  type: null,
  data: PopulatedSelectMenuData
): ActionRowBuilder<MentionableSelectMenuBuilder>;

function createPopulatedSelectMenu(
  type: SelectMenuDefaultValueType | null,
  data: PopulatedSelectMenuData<any>
): ActionRowBuilder<AnyComponentBuilder> {
  let menu: AnyComponentBuilder;

  switch (type) {
    case SelectMenuDefaultValueType.Channel:
      menu = new ChannelSelectMenuBuilder({
        custom_id: data.cid,
        disabled: data.disabled,
        max_values: data.max,
        min_values: data.min,
        placeholder: data.placeholder,
        channel_types: (
          data as PopulatedSelectMenuData<SelectMenuDefaultValueType.Channel>
        ).channelTypes,
        default_values: data.defaultValues,
      });
      break;

    case SelectMenuDefaultValueType.Role:
      menu = new RoleSelectMenuBuilder({
        custom_id: data.cid,
        disabled: data.disabled,
        max_values: data.max,
        min_values: data.min,
        placeholder: data.placeholder,
        default_values: data.defaultValues,
      });
      break;

    case SelectMenuDefaultValueType.User:
      menu = new UserSelectMenuBuilder({
        custom_id: data.cid,
        disabled: data.disabled,
        max_values: data.max,
        min_values: data.min,
        placeholder: data.placeholder,
        default_values: data.defaultValues,
      });
      break;

    default:
      menu = new MentionableSelectMenuBuilder({
        custom_id: data.cid,
        disabled: data.disabled,
        max_values: data.max,
        min_values: data.min,
        placeholder: data.placeholder,
        default_values: data.defaultValues,
      });
      break;
  }

  return createActionRow(menu);
}

function createMenuDefaultValue<T extends SelectMenuDefaultValueType>(
  type: T,
  id: string
) {
  return { type, id } satisfies APISelectMenuDefaultValue<T>;
}

export const selectMenuMap = {
  string: createStringSelectMenu,
  role: (data: PopulatedSelectMenuData<SelectMenuDefaultValueType.Role>) =>
    createPopulatedSelectMenu(SelectMenuDefaultValueType.Role, data),
  user: (data: PopulatedSelectMenuData<SelectMenuDefaultValueType.User>) =>
    createPopulatedSelectMenu(SelectMenuDefaultValueType.User, data),
  channel: (
    data: PopulatedSelectMenuData<SelectMenuDefaultValueType.Channel>
  ) => createPopulatedSelectMenu(SelectMenuDefaultValueType.Channel, data),
  mentionable: (data: PopulatedSelectMenuData) =>
    createPopulatedSelectMenu(null, data),
};

export const selectMenuDefaultValueMap = {
  role: (id: string) =>
    createMenuDefaultValue(SelectMenuDefaultValueType.Role, id),
  user: (id: string) =>
    createMenuDefaultValue(SelectMenuDefaultValueType.User, id),
  channel: (id: string) =>
    createMenuDefaultValue(SelectMenuDefaultValueType.Channel, id),
};
