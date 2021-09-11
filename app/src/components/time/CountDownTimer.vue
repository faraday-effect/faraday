<template>
  <span>
    {{ timeRemaining }}
  </span>
</template>

<script lang="ts">
import { defineComponent, toRef, ref, onMounted } from 'vue';
import { DateTime, Duration } from 'luxon';

/**
 * Count-down Timer component.
 *
 * Provide either:
 * * `expire-after`, an ISO 8601 duration string
 * * `expire-at`, an ISO 8601 datetime
 * See https://en.wikipedia.org/wiki/ISO_8601 for details.
 *
 * The timer will begin counting down immediately.
 * If more than one timer will run simultaneously,
 * distinguish the timers by passing a `timer-id`
 *
 * When the timer expires, emit an `expired` event
 * with the `timer-id` supplied.
 *
 * Format the remaining time using duration-format; see
 * https://moment.github.io/luxon/api-docs/index.html#durationtoformat
 * for formatting options.
 */
export default defineComponent({
  name: 'CountDownTimer',

  props: {
    timerId: { type: String, default: '<no timer-id set>' },
    expireAfter: { type: String },
    expireAt: { type: [String, DateTime] },
    durationFormat: { type: String, default: 'hh:mm:ss' },
  },

  emits: {
    expired: (id: string) => !!id,
  },

  setup(props, { emit }) {
    const timeRemaining = ref('');
    let intervalId = -Infinity;
    // Use a calculated expiration time to avoid clock drift.
    let expirationDateTime: DateTime;

    const updateTimer = () => {
      const currentDateTime = DateTime.now();
      if (currentDateTime < expirationDateTime) {
        timeRemaining.value = expirationDateTime
          .diff(currentDateTime)
          .toFormat(props.durationFormat);
      } else {
        timeRemaining.value = Duration.fromObject({
          hours: 0,
          minutes: 0,
          seconds: 0,
        }).toFormat(props.durationFormat);

        stopTimer();

        emit('expired', props.timerId);
      }
    };

    const startTimer = () => {
      // Use `toRef` because these are both optional.
      const expireAfter = toRef(props, 'expireAfter');
      const expireAt = toRef(props, 'expireAt');

      const currentTime = DateTime.now();

      if (expireAfter.value) {
        // Expire after some duration.
        const dur = Duration.fromISO(expireAfter.value);
        if (!dur.isValid) {
          throw new Error(`Invalid expireAfter value: ${expireAfter.value}`);
        }
        expirationDateTime = currentTime.plus(dur);
      } else if (expireAt.value) {
        // Expire at some particular time.
        let dt: DateTime;
        if (typeof expireAt.value === 'string') {
          // Time given as an ISO string.
          dt = DateTime.fromISO(expireAt.value);
          if (!dt.isValid) {
            throw new Error(`Invalid expireAt string ${expireAt.value}`);
          }
        } else if (expireAt.value instanceof DateTime) {
          // Time given as a DateTime object.
          dt = expireAt.value;
        } else {
          throw new Error('Invalid type for expireAt');
        }

        if (dt < currentTime) {
          throw new Error(`expireAt in the past: ${dt.toISO()}`);
        }
        expirationDateTime = dt;
      } else {
        throw new Error('Must supply either `expireAfter` or `expireAt` prop');
      }

      intervalId = window.setInterval(updateTimer, 1000);
    };

    const stopTimer = () => {
      if (intervalId > -Infinity) {
        window.clearInterval(intervalId);
      }
    };

    onMounted(startTimer);

    return { timeRemaining };
  },
});
</script>
