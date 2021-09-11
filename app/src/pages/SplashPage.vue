<template>
  <q-page>
    <div class="splash-page">
      <div class="title-text-block">
        <div class="several-columns text-h6">
          <span>{{ courseNumber }}</span>
          <span>{{ courseName }}</span>
          <span>{{ semester }}</span>
        </div>
        <div class="course-title text-center text-h4">
          Non-Deterministic Finite State Automata
        </div>
        <div class="several-columns text-h6">
          <span>{{ presenter }}</span>
          <span>{{ currentDate }}</span>
        </div>
      </div>
      <div>
        <q-toggle v-model="clockRunning" label="Run the Clock" />
      </div>
      <real-time-clock class="text-h4" :clock-running="clockRunning" />
      <div>
        Expire After:
        <count-down-timer
          class="text-h4"
          timer-id="expire after duration"
          expire-after="PT11S"
          duration-format="mm:ss"
          @expired="timesUp"
        />
      </div>
      <div>
        Expire At {{ expireAt }}:
        <count-down-timer
          class="text-h4"
          timer-id="expire at time"
          :expire-at="expireAt"
          @expired="timesUp"
        />
      </div>
      <span class="url">{{ qrCode }}</span>
      <quick-response-code class="qr-code" :qr-code="qrCode" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuickResponseCode from 'components/QuickResponseCode.vue';
import RealTimeClock from 'components/WallClock.vue';
import CountDownTimer from 'components/CountDownTimer.vue';
import { DateTime } from 'luxon';

export default defineComponent({
  name: 'SplashPage',
  components: { CountDownTimer, RealTimeClock, QuickResponseCode },
  data() {
    return {
      semester: 'Fall 2021',
      courseNumber: 'COS 380',
      courseName: 'Natural Language Processing',
      currentDate: 'F/03-Sep-2021',
      qrCode: 'https://faraday.cse.taylor.edu',
      presenter: 'Dr. Tom Nurkkala',
      clockRunning: false,
      expireAt: DateTime.now().plus({ seconds: 7 }),
    };
  },
  methods: {
    timesUp(timerId: string) {
      console.log('TIMER EXPIRED!', timerId);
    },
  },
});
</script>

<style scoped>
.splash-page {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
}

.title-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px teal solid;
  border-top: 8px teal solid;
}

.several-columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.course-title {
  margin: 2rem 0;
}

.url {
  font-family: Menlo, monospace;
  font-size: large;
  font-weight: bold;
  color: teal;
}
</style>
