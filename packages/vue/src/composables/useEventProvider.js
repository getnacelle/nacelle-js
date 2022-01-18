import { inject } from 'vue-demi';

export default function useEventProvider() {
  return {
    addEvent: inject('addEvent'),
    onEvent: inject('onEvent')
  };
}
