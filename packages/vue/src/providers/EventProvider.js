import {
  computed,
  h,
  provide,
  readonly,
  ref,
  watch
} from '@vue/composition-api';

export default {
  name: 'EventProvider',
  props: {
    maxLength: {
      type: Number,
      default: 15
    },
    eventHandlers: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const eventLog = ref([]);
    const eventHandlers = ref(props.eventHandlers);
    const lastEvent = computed(() => eventLog.value[0]);

    /**
     * Registers an event with the Event Provider.
     * @param {Object} config
     * @param {string} config.type Type of event
     * @param {Object} config.payload Data associated with the event
     * @returns {void}
     */
    const addEvent = ({ type, payload }) => {
      const event = { type, payload, timestamp: Date.now() };

      eventLog.value = [event, ...eventLog.value].slice(0, props.maxLength);
    };

    /**
     * Registers an event handler with the Event Provider.
     * @param {Object} config
     * @param {string} config.type Type of event to be handled
     * @param {function} config.callback Callback function that processes the event object
     * @returns {void}
     */
    const onEvent = ({ type, callback }) => {
      if (typeof type !== 'string' || !type) {
        console.warn(
          "[nacelle] events passed to the EventProvider's `onEvent` method must have a `type`."
        );
        return;
      }

      if (typeof callback !== 'function') {
        console.warn(
          "[nacelle] events passed to the EventProvider's `onEvent` method must have a valid `callback` function."
        );
        return;
      }

      eventHandlers.value = [...eventHandlers.value, { type, callback }];
    };

    const eventCallbacks = computed(() => {
      // build up a hash table for easy lookups of the
      // callbacks associated with any given event type
      return eventHandlers.value.reduce((table, eventHandler) => {
        const tableEntry = {};
        const { callback } = eventHandler;
        const eventTypeCallbacks = table[eventHandler.type]
          ? table[eventHandler.type].callbacks
          : [];

        tableEntry[eventHandler.type] = {
          callbacks: [...eventTypeCallbacks, { callback }]
        };

        return { ...table, ...tableEntry };
      }, {});
    });

    watch(lastEvent, event => {
      if (event?.type && eventCallbacks.value[event.type]) {
        eventCallbacks.value[event.type].callbacks.forEach(callbackObj =>
          callbackObj.callback(event)
        );
      }
    });

    provide('events', readonly(eventLog));
    provide('addEvent', addEvent);
    provide('onEvent', onEvent);

    return () => h('div', context.slots.default());
  }
};
