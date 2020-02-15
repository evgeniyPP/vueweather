<template>
  <div id="app" :class="isFetched && isWarm">
    <main>
      <div class="search-box">
        <input
          type="text"
          name=""
          id=""
          placeholder="Поиск..."
          v-model="query"
          @blur="fetchWeather"
        />
      </div>
      <div class="results" v-if="isFetched">
        <div class="info">
          <div class="location">{{ results.location }}</div>
          <div class="date">{{ useDate() }}</div>
        </div>
        <div class="weather">
          <div class="temperature">{{ Math.round(results.temperature) }}°C</div>
          <div class="description">{{ results.description }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, computed, onBeforeMount } from '@vue/composition-api';
import { useDate } from './assets/useDate';

export default {
  name: 'App',
  setup() {
    const query = ref('');
    const results = reactive({
      location: null,
      temperature: null,
      description: null
    });

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query.value}&units=metric&lang=ru&APPID=${process.env.VUE_APP_API_KEY}`
        );

        const {
          name,
          main: { temp },
          weather
        } = await response.json();

        results.location = name;
        results.temperature = temp;
        results.description = weather[0].description;

        query.value = '';
      } catch (e) {
        console.log(e);
      }
    };

    const isFetched = computed(() => Boolean(results.temperature));
    const isWarm = computed(() => (results.temperature > 16 ? 'warm' : ''));

    onBeforeMount(() => {
      query.value = 'Москва';
      fetchWeather();
    });

    return {
      query,
      results,
      fetchWeather,
      isFetched,
      isWarm,
      useDate
    };
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
}

#app {
  background-image: url('./assets/images/cold-bg.png');
  background-size: cover;
  transition: 0.4s;

  &.warm {
    background-image: url('./assets/images/warm-bg.png');
  }
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box {
  width: 100%;
  margin-bottom: 30px;

  input {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0 16px 0 16px;
    transition: 0.4s;

    &:focus {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 16px 0 16px 0;
    }
  }
}

.results {
  color: #fff;

  .info {
    text-align: center;

    .location {
      font-size: 2rem;
      font-weight: 500;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .date {
      font-size: 1.25rem;
      font-weight: 300;
      font-style: italic;
    }
  }

  .weather {
    text-align: center;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

    .temperature {
      display: inline-block;
      margin: 30px 0;
      padding: 10px 25px;
      font-size: 5.5rem;
      font-weight: 900;

      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
    }

    .description {
      font-size: 2.5rem;
      font-weight: 700;
      font-style: italic;
      word-wrap: break-word;
    }
  }
}
</style>
