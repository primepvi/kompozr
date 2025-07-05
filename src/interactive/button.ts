import { ButtonStyle } from "discord-api-types/v10";
import { ButtonBuilder } from "discord.js";
import { CommonButtonData, LinkButtonData } from "../types/button";

function createCommonButton(style: ButtonStyle, data: CommonButtonData) {
  return new ButtonBuilder({
    custom_id: data.cid,
    disabled: data.disabled,
    emoji: data.emoji,
    label: data.label,
    style,
  });
}

function createLinkButton(data: LinkButtonData) {
  return new ButtonBuilder({
    disabled: data.disabled,
    emoji: data.emoji,
    style: ButtonStyle.Link,
    url: data.url,
    label: data.label,
  });
}

export const buttonMap = {
  danger: createCommonButton.bind(null, ButtonStyle.Danger),
  success: createCommonButton.bind(null, ButtonStyle.Success),
  primary: createCommonButton.bind(null, ButtonStyle.Primary),
  secondary: createCommonButton.bind(null, ButtonStyle.Secondary),
  link: createLinkButton,
};
