import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ModalData, ModalTextInputData } from "../types/modal";
import { createActionRow } from "../layout/action-row";

export function createModal(data: ModalData) {
  return new ModalBuilder({
    custom_id: data.cid,
    title: data.title,
    components: data.inputs,
  });
}

function createModalInput(style: TextInputStyle, data: ModalTextInputData) {
  const input = new TextInputBuilder({
    custom_id: data.cid,
    label: data.label,
    max_length: data.max,
    min_length: data.min,
    required: data.required,
    placeholder: data.placeholder,
    value: data.value,
    style,
  });

  return createActionRow(input);
}

export const modalInputMap = {
  short: createModalInput.bind(null, TextInputStyle.Short),
  paragraph: createModalInput.bind(null, TextInputStyle.Paragraph),
};
