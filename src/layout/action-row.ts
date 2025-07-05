import { ActionRowBuilder, AnyComponentBuilder } from "discord.js";

export function createActionRow<T extends AnyComponentBuilder>(
  ...components: T[] | T[][]
) {
  return new ActionRowBuilder<T>({
    components: components.flat(Infinity) as T[],
  });
}
