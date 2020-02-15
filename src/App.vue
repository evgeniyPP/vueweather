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
          <div class="location">{{ results.name }}, {{ results.sys.country }}</div>
          <div class="date">{{ date() }}</div>
        </div>
        <div class="weather">
          <div class="temperature">{{ Math.round(results.main.temp) }}°C</div>
          <div class="state">{{ results.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import { ref } from '@vue/composition-api';

export default {
  name: 'App',
  // setup() {
  //   return {};
  // }
  data() {
    return {
      baseUrl: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      results: {}
    };
  },
  methods: {
    async fetchWeather() {
      const response = await fetch(
        `${this.baseUrl}weather?q=${this.query}&units=metric&APPID=${process.env.VUE_APP_API_KEY}`
      );
      const data = await response.json();
      this.setResults(data);
    },
    setResults(data) {
      this.results = data;
    },
    date() {
      const d = new Date();
      const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
      ];
      const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    }
  },
  computed: {
    isFetched() {
      return this.results.main;
    },
    isWarm() {
      return this.results.main.temp > 16 ? 'warm' : '';
    }
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
  background-image: url('./assets/cold-bg.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;

  max-width: 400px;
  margin: 0 auto;

  &.warm {
    background-image: url('./assets/warm-bg.jpg');
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

    .state {
      font-size: 3rem;
      font-weight: 700;
      font-style: italic;
    }
  }
}
</style>
