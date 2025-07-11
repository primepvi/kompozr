export type MemoConstructor<Props, Component> = (props: Props) => Component;
export type MemoManager<Props, Deps> = (props: Props) => Deps[];

export function memo<Props, Component, Deps>(
  constructor: MemoConstructor<Props, Component>,
  manager: MemoManager<Props, Deps>
) {
  let lastDeps: Array<Deps> = [];
  let lastResult: Component | null = null;

  return (props: Props) => {
    const currentDeps = manager(props);
    const isSameDeps =
      lastDeps.length === currentDeps.length &&
      lastDeps.every((dep, i) => dep === currentDeps[i]) &&
      lastResult;

    if (isSameDeps) return lastResult;

    lastDeps = currentDeps;
    lastResult = constructor(props);
    return lastResult;
  };
}
