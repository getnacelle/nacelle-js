import { inject } from 'vue';

export default function useEventProvider() {
  return {
    addEvent: inject('addEvent'),
    onEvent: inject('onEvent')
  };
}
