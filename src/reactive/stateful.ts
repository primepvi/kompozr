export type StatefulRenderer<State extends Record<string, any>, Component> = (
  state: State
) => Component;

export function stateful<State extends Record<string, any>, Component>(
  initialState: State,
  renderer: StatefulRenderer<State, Component>
) {
  let currentState = initialState;

  return {
    get state() {
      return currentState;
    },

    update(props: Partial<State>) {
      currentState = { ...currentState, ...props };
    },

    render() {
      return renderer(currentState);
    },
  };
}
