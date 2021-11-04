import { ref, reactive, computed } from 'vue';

interface ApiResults {
  location: string | null;
  temperature: number | null;
  description: string | null;
}

function useSearch() {
  const query = ref('');
  const results: ApiResults = reactive({
    location: null,
    temperature: null,
    description: null
  });

  const fetchWeather = async (q = query.value) => {
    try {
      const response = await fetch(getApiUrl(q));

      const { name, main, weather } = await response.json();

      if (!main?.temp) {
        return;
      }

      results.location = name;
      results.temperature = Math.round(main.temp);
      results.description = weather[0].description;

      query.value = '';
    } catch (e) {
      console.error(e);
    }
  };

  const isFetched = computed(() => Boolean(results.temperature));
  const isWarm = computed(() => (results.temperature && results.temperature > 16 ? 'warm' : ''));

  return {
    query,
    results,
    fetchWeather,
    isFetched,
    isWarm
  };
}

function getApiUrl(query: string): string {
  const { VITE_API_URL: apiUrl, VITE_API_KEY: apiKey } = import.meta.env;

  return `${apiUrl}?q=${query}&units=metric&lang=ru&APPID=${apiKey}`;
}

export default useSearch;
