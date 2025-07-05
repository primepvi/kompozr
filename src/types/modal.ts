import { ActionRowBuilder, TextInputBuilder } from "discord.js";

export interface ModalData {
  cid: string;
  title: string;
  inputs: ActionRowBuilder<TextInputBuilder>[];
}

export interface ModalTextInputData {
  cid: string;
  label: string;
  max?: number;
  min?: number;
  placeholder?: string;
  required?: boolean;
  value?: string;
}
