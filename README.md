# tvmaze

This project is a TV show dashboard that uses open APIs from [TvMaze](http://www.tvmaze.com/api) to create an application that allows users to view horizontal lists of TV shows that are grouped based on genres and sorted according to their ratings (descending). There is a search feature incorporated to look up shows and users can click on any show to view its details.

## Technologies

This application is primarily a Vue.js project. Below you can find a table of tools, their versions and the reason why they have been chosen.

| Tool | version | Why? |
|----------|----------|----------|
| Vue    | 3.5.17     | Vue (3, composition api) is the main technology to build this frontend application     |
| Vite    | 6.3.5     | The default build tool that comes with Vue, offering instant server start and HMR     |
| Vitest    | 3.2.4     | Recommended unit test framework, native to Vite     |
| @nuxt/ui    | 3.2.0     | One of the best UI libraries that works seamlessly with Vue and offers responsiveness, a11y, theme-ing, and highly flexible     |
| vue-router    | 4.5.1     | Configurable routing for Vue.js and needed for Nuxt Ui auto imports     |
| @antfu/eslint-config    | 4.16.1     | My favorite formatter     |
| @vueuse/core    | 13.4.0     | A collection of utility functions that make the life of Vue developers easier, based on composition API and very powerful     |
| h3    | 1.15.3     | A server framework I used in this project to build a simple backend to handle data     |


## Project Setup and Requirements

- Node.js: v22.17.0 (LTS July 2025)
- npm: v11.4.2 (the latest stable release as of June 2025)

```sh
npm install
npm run dev
```

You should have the server running at port 3000 and frontend client at port 5173.
So open https://localhost:5173/ in your browser and you should be able to see the application running.


## Challenges and Decisions

To me this project has 3 main parts. A landing page where use sees genres and top shows, a search bar to look for shows, and a detail page to read more about each show. So I divided the development into three main stories and tackled the challenges in each story accordingly.

### Detail page

For user to be able to select any show and view its details, I made a dynamic route under `/shows/:id`. Based on the id in the route, I call an endpoint from TvMaze to fetch the details for the shows. In the meantime I show a loading indicator (skeleton loading) to the user and if anything goes wrong, I catch the error and show an error toaster to the user. Upon receiving a response, show image, title, description, cast member, and more details are shown in a responsive way on the screen.

### Landing page with genres and top shows

This part is arguably the most complex part of the project. TvMaze does not provide a direct endpoint to retrieve shows by genre. Instead there is a show index endpoint that lists all shows in their database. This endpoint is paginated and they hint that you can use this endpoint to access all the shows and their primary information if you build a local cache of all items. So that's what I did.
I built a minimal API backend with Vite (node plugin) and H3 engine and exposed a desired endpoint that groups all shows and sorts them based on rating.
The data fetching is first happening in the api route in `server/api/shows.ts` where shows are iterated through and cached for 24 hours. Then I enabled my H3 backend in project's vite config. As easy as that now I can access all the shows how I want them on my frontend. It's lightweight and it's cached.
On the frontend, I display all the genres with their top 10 shows and I added a "View more" button to show more items in a paginated way but for the sake of time and demonstration I skip that here.

> **NOTE**
> Because the first time you run the app, the backend tries to fetch all the listings, it might take a bit longer to see the end result. But after that results should show up pretty fast.

### Search feature

The search feature is an input with a button that calls the search api from TvMaze. If there is a response, the result is shown and user can click on any item. If there is no result found, user sees an appropriate message.
Clicking on a search result or clicking outside the result box should close the box.


To make a simple yet eye-catching look, I made use of [NuxtUI](https://ui.nuxt.com/). Benefits of the library:
- Reka UI component library
- Tailwind CSS integration
- Access to Iconify
- Easy themes and colors


## Unit Tests with [Vitest](https://vitest.dev/)

There is a number of unit tests covering this project using: vitest, @testing-library/vue, and @vue/test-utils.

```sh
npm run test
```
