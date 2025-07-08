import { SeparatorBuilder, SeparatorSpacingSize } from "discord.js";

enum SeparatorStyle {
  Small,
  Large,
  SmallHidden,
  LargeHidden,
}

function createSeparator(style: SeparatorStyle) {
  const divider =
    style == SeparatorStyle.Small || style == SeparatorStyle.Large;
  const isLargeSpacing =
    style == SeparatorStyle.Large || style == SeparatorStyle.LargeHidden;

  return new SeparatorBuilder({
    divider,
    spacing: isLargeSpacing
      ? SeparatorSpacingSize.Large
      : SeparatorSpacingSize.Small,
  });
}

export const separatorMap = {
  small: createSeparator(SeparatorStyle.Small),
  smallHidden: createSeparator(SeparatorStyle.SmallHidden),
  large: createSeparator(SeparatorStyle.Large),
  largeHidden: createSeparator(SeparatorStyle.LargeHidden),
};
