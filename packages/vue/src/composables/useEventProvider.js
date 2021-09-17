import { inject } from '@vue/composition-api';

export default function useEventProvider() {
  const addEvent = inject('addEvent');
  const onEvent = inject('onEvent');

  return {
    addEvent,
    onEvent
  };
}
