import { createTextDisplay } from "../content/text-display";
import { ContainerComponentItem } from "./container";

export function createBase(
  ...components: ContainerComponentItem[] | ContainerComponentItem[][]
): Exclude<ContainerComponentItem, string>[] {
  return components
    .flat(Infinity)
    .filter(
      (
        component
      ): component is Exclude<ContainerComponentItem, string> | string =>
        !Array.isArray(component)
    )
    .map((component) => {
      if (typeof component == "string") return createTextDisplay(component);
      return component;
    });
}
