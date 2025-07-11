export type FragmentRenderer<Props, Component> = (props: Props) => Component;

export function fragment<Props, Component>(
  renderer: FragmentRenderer<Props, Component>
) {
  return (props: Props | Props[]) => {
    if (Array.isArray(props)) return props.map(renderer);
    return [renderer(props)];
  };
}
