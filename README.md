<p align="center">
  <img src="https://raw.githubusercontent.com/primepvi/kompozr/main/assets/kompozr.png" alt="kompozr logo" width="320" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/kompozr">
    <img src="https://img.shields.io/npm/v/kompozr.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/kompozr">
    <img src="https://img.shields.io/npm/dm/kompozr.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/primepvi/kompozr">
    <img src="https://img.shields.io/github/stars/primepvi/kompozr?style=flat-square" alt="GitHub stars" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License: MIT" />
  </a>
</p>

🧩 **kompozr** is a composable UI layer for
[discord.js](https://discord.js.org/) bots, providing ergonomic wrapper
functions for building Discord UI components with less boilerplate and a focus
on developer experience.

---

## 📚 Table of Contents

- [About](#about)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components & Usage](#components--usage)
  - [Buttons](#buttons)
  - [Select Menus](#select-menus)
  - [Modals & Inputs](#modals--inputs)
  - [Layout Components](#layout-components)
  - [Content Components](#content-components)
- [Full Example](#full-example)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

---

## ℹ️ About

kompozr was created to **improve the developer experience** when building
Discord bots with [discord.js](https://discord.js.org/).  
The Discord.js builder API is powerful, but can be verbose and repetitive for
common UI patterns. kompozr introduces a philosophy of **"less builders"**:

- Compose UIs with fewer lines of code
- Use simple, declarative wrappers instead of chaining builder methods
- Focus on what your UI should do, not how to wire up every builder

kompozr is **open source** and welcomes contributions! If you have ideas,
improvements, or new components, feel free to open a PR or issue on
[GitHub](https://github.com/primepvi/kompozr).

---

## 🚀 Installation

```sh
npm install kompozr
```

---

## ⚡ Quick Start

Import the main API object:

```ts
import { k } from "kompozr";
```

---

## 🛠️ Components & Usage

### Buttons

Buttons are interactive components that users can click. With kompozr, you can
easily create all Discord button styles using a simple and consistent API. Each
button requires a `cid` (custom id) and a `label` or `emoji`. You can also add
both and set the button as disabled.

```ts
const button = k.button.primary({
  cid: "my_button",
  label: "Click me!",
  emoji: "👋",
});
```

Other button styles:

- `k.button.secondary` – Gray button for secondary actions.
- `k.button.success` – Green button for positive actions.
- `k.button.danger` – Red button for destructive actions.
- `k.button.link` – Link button (use `url` instead of `cid`).

#### Example

```ts
const linkButton = k.button.link({
  url: "https://github.com/silentadv/kompozr",
  label: "GitHub",
});
```

---

### Select Menus

Select menus allow users to pick one or more options from a dropdown. kompozr
supports all Discord select menu types, including string, role, user, channel,
and mentionable selects. Each select requires a `cid` and an array of options.

```ts
const selectMenu = k.select.string({
  cid: "my_select",
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ],
  placeholder: "Choose an option",
});
```

Other select types:

- `k.select.role` – Select one or more roles.
- `k.select.user` – Select one or more users.
- `k.select.channel` – Select one or more channels.
- `k.select.mentionable` – Select users or roles.

#### Example: Channel Select

```ts
const channelSelect = k.select.channel({
  cid: "channel_select",
  placeholder: "Pick a channel",
  channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
});
```

#### Example: User Select with Default Options

```ts
const userSelect = k.select.user({
  cid: "user_select",
  placeholder: "Pick a user",
  defaultValues: [
    k.selectValue.user("user-id-1"),
    k.selectValue.user("user-id-2"),
  ],
});
```

---

### Modals & Inputs

Modals are pop-up forms that can collect user input. kompozr lets you build
modals with short or paragraph text inputs. Each input requires a `cid` and a
`label`. You can mark inputs as required and set placeholders.

```ts
const modal = k.modal({
  cid: "feedback_modal",
  title: "Feedback",
  inputs: [
    k.input.short({
      cid: "username",
      label: "Your Name",
      required: true,
    }),
    k.input.paragraph({
      cid: "feedback",
      label: "Your Feedback",
      required: true,
    }),
  ],
});
```

---

### Layout Components

kompozr provides helpers to organize your UI components into rows, sections,
containers, and layouts.

#### Action Row

Use `row` only to group buttons. Discord allows only one select menu per row,
and kompozr's select wrappers already return a row containing the select menu.

```ts
const row = k.row(
  k.button.success({ cid: "ok", label: "OK" }),
  k.button.danger({ cid: "cancel", label: "Cancel" })
);
```

#### Section

Sections let you combine text and an accessory (like a button or select) in a
single block. Use `section` to align text (max 3 text display) side by side with
an accessory, such as a button or a thumbnail. The main content can be a plain
string or a component created with `k.text`. This makes it easy to display a
message with an interactive element or image next to it.

```ts
const section = k.section({
  components: ["Welcome to the server!", k.text("Enjoy your stay!")],
  accessory: k.button.primary({ cid: "welcome", label: "Say Hi!" }),
});
```

#### Separator

Separators visually divide content. Choose from different sizes and visibility.

```ts
k.separator.small; // small spacing
k.separator.large; // large spacing
k.separator.smallHidden; // small spacing without divider (only space)
k.separator.largeHidden; // large spacing without divider (only space)
```

#### Container

Containers are an layout block for messages, is a component composer, allowing
you to group sections, rows, separators, and other components. You can also set
a color for the container.

```ts
const container = k.container({
  components: [
    section,
    k.row(
      k.button.success({ cid: "ok", label: "OK" }),
      k.button.danger({ cid: "cancel", label: "Cancel" })
    ),
    k.separator.small,
    "good text here.",
    k.text("line 1", "line 2"),
  ],
  color: "Blurple", // or [114,137,218], #ff0000, 0xff
});
```

#### Layout (Base)

The `layout` utility is a simple helper that lets you combine any
components—including plain strings—into a single array. This means you can use
strings directly in your layouts without always needing to wrap them with
`k.text` or a text display builder. It's mainly for convenience and advanced
custom layouts, and does not support color like `container`.

```ts
const layout = k.layout(
  k.text("Header"),
  k.row(
    k.button.primary({ cid: "a", label: "A" }),
    k.button.secondary({ cid: "b", label: "B" })
  ),
  k.separator.small,
  "Hello World!"
);
```

---

### Content Components

kompozr also provides helpers for displaying text, images, files, and media
galleries.

#### Text Display

Display plain or formatted text in your UI.

```ts
const text = k.text("Hello, world!");
const multiLineText = k.text("Line1", "Line2", "Line3");
```

#### Thumbnail

Add a thumbnail image with an optional description.

```ts
const thumbnail = k.thumbnail({
  url: "https://example.com/thumb.png",
  description: "A thumbnail",
});
```

#### File

Attach a file to your message, with optional spoiler support.

```ts
const file = k.file({
  url: "https://example.com/file.pdf",
  spoiler: true,
});
```

#### Media Gallery

Display a gallery of images or media files. Each item can have a description and
be marked as a spoiler.

```ts
const gallery = k.gallery(
  { url: "https://example.com/image1.png", description: "First image" },
  { url: "https://example.com/image2.png", spoiler: true }
);
```

---

## Full Example

```ts
import { k } from "kompozr";

const button = k.button.success({
  cid: "ok_btn",
  label: "OK",
});

const gallery = k.gallery({
  url: "https://example.com/cat.png",
  description: "A cute cat",
});

const message = k.container({
  components: [
    k.section({
      components: ["Check out this gallery!"],
      acessory: button,
    }),
    gallery,
    k.separator.small,
    k.text("Thanks for using kompozr!"),
  ],
  color: "Green",
});

// Send `message` as your bot's response
```

---

## API Reference

All builder functions return Discord.js builder instances, ready to be used in
your bot's responses.

- **Buttons:** `k.button.primary`, `k.button.secondary`, `k.button.success`,
  `k.button.danger`, `k.button.link`
- **Select Menus:** `k.select.string`, `k.select.role`, `k.select.user`,
  `k.select.channel`, `k.select.mentionable`
- **Populated Select Menus Values:** `k.selectValue.user`, `k.selectValue.role`,
  `k.selectValue.channel`
- **Modals & Inputs:** `k.modal`, `k.input.short`, `k.input.paragraph`
- **Layout:** `k.row`, `k.section`, `k.container`, `k.separator`, `k.layout`
- **Content:** `k.text`, `k.thumbnail`, `k.gallery`, `k.file`

---

## TypeScript Support

kompozr is written in TypeScript and ships with full type definitions.

---

## Contributing

kompozr is **open source** and contributions are welcome!  
If you have suggestions, bug reports, or want to add new features/components,
please open an issue or PR on [GitHub](https://github.com/primepvi/kompozr).

---

## License

MIT

---

> Made with ❤️ by [primepvi](https://github.com/primepvi)
