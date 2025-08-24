import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

type SeparatorStyle = 
  "Small"
  | "Large"
  | "SmallHidden"
  | "LargeHidden"

function createSeparator(style: SeparatorStyle) {
  const divider =
    style == "Small" || style == "Large";
  const isLargeSpacing =
    style == "Large" || style == "LargeHidden";

  return new SeparatorBuilder({
    divider,
    spacing: isLargeSpacing
      ? SeparatorSpacingSize.Large
      : SeparatorSpacingSize.Small,
  });
}

export const separatorMap = {
  small: createSeparator("Small"),
  smallHidden: createSeparator("SmallHidden"),
  large: createSeparator("Large"),
  largeHidden: createSeparator("LargeHidden"),
};
