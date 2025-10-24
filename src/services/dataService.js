const DATA_URLS = ['/data/data.json', 'data/data.json', './data/data.json'];

let cachedData = null;
let fetchPromise = null;

export const dataService = {
  async getComponentData(componentName) {
    console.log(`📡 Fetching data for: ${componentName}`);

    if (fetchPromise) {
      console.log(`⏳ Waiting for existing fetch...`);
      const allData = await fetchPromise;
      if (!(componentName in allData)) {
        throw new Error(`Component '${componentName}' not found in fetched data`);
      }
      return allData[componentName];
    }

    if (cachedData && cachedData[componentName]) {
      console.log(`✅ Returning cached data for: ${componentName}`);
      return cachedData[componentName];
    }

    console.log(`🚀 Starting new fetch for: ${componentName}`);

    fetchPromise = (async () => {
      let lastError = null;
      for (const url of DATA_URLS) {
        try {
          console.log(`🔎 Trying data URL: ${url}`);
          const res = await fetch(url);
          if (!res.ok) {
            lastError = new Error(`HTTP error fetching ${url}: ${res.status}`);
            console.warn(lastError.message);
            continue;
          }
          const allData = await res.json();
          cachedData = allData;
          return allData;
        } catch (err) {
          lastError = err;
          console.warn(`Fetch failed for ${url}:`, err.message ?? err);
        }
      }
      fetchPromise = null;
      throw lastError ?? new Error('Failed to fetch data.json from all candidate URLs');
    })();

    const allData = await fetchPromise;
    if (!(componentName in allData)) {
      throw new Error(`Component '${componentName}' not found in data`);
    }
    return allData[componentName];
  },

  clearCache() {
    cachedData = null;
    fetchPromise = null;
    console.log('🗑️ Cache cleared');
  }
};
