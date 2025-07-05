import { APIMessageComponentEmoji, ButtonStyle } from "discord.js";

export interface BaseCommonButtonData {
  cid: string;
  emoji?: APIMessageComponentEmoji;
  label?: string;
  disabled?: boolean;
}

export interface BaseLinkButtonData {
  url: string;
  emoji?: string;
  label?: string;
  disabled?: boolean;
}

export type CommonButtonData =
  | ({ emoji: string } & BaseCommonButtonData)
  | ({ label: string } & BaseCommonButtonData);

export type LinkButtonData =
  | ({ emoji: string } & BaseLinkButtonData)
  | ({ label: string } & BaseLinkButtonData);
