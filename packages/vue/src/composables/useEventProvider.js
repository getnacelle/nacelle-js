import { inject } from '@vue/composition-api';

export default function useEventProvider() {
  return {
    addEvent: inject('addEvent'),
    onEvent: inject('onEvent')
  };
}
