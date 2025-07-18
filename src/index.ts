import {
  createTextDisplay,
  createThumbnail,
  createMediaGallery,
  createFile,
} from "./content";

import {
  buttonMap,
  selectMenuMap,
  selectMenuDefaultValueMap,
  createModal,
  modalInputMap,
} from "./interactive";

import {
  createActionRow,
  separatorMap,
  createSection,
  createContainer,
  createBase,
} from "./layout";

import { fragment, memo, stateful } from "./reactive";

export const k = {
  // interactive
  button: buttonMap,
  select: selectMenuMap,
  selectValue: selectMenuDefaultValueMap,
  modal: createModal,
  input: modalInputMap,

  // layout
  row: createActionRow,
  separator: separatorMap,
  section: createSection,
  container: createContainer,
  layout: createBase,

  // content
  text: createTextDisplay,
  thumbnail: createThumbnail,
  gallery: createMediaGallery,
  file: createFile,

  // reactive
  memo,
  stateful,
  fragment,
};

export type * from "./types";
export type * from "./content";
export type * from "./layout";
export type * from "./interactive";
export type * from "./reactive";
