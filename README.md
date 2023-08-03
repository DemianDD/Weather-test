# Weather-test

## Project Setup

```sh
npm install

npm run dev
```

### Describe

Weather application implemented by using Vue and Vuex. App include 2 sections. First section is resposible for weather forecast and include 3 blocks:
1 block - show current weather
2 block - show 5 days weather
3 block - chart which show todays weather in different hours
By default it show weather according to your current location by using geo api.
Second section is resposible for booking trips. User could add a new trip (with required Date time) to trip list and could search for some trips. Each trip has 2 blocks:
1 block - show current weather with countdown
2 block - show weather according to selected Dates

During work was some troubles with autocomplete because i couldnt find perfect api for cities, and used instead json file with list of more than 100k cities. Searching works a little bit slowly

```sh
