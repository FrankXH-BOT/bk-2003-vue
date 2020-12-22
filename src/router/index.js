import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CenterRouter from "./routes/center";
import FilmsRouter from "./routes/films";
import CinemasRouter from "./routes/cinemas";
import CityRouter from "./routes/city";

const routes = [
  CenterRouter,
  ...FilmsRouter,
  CinemasRouter,
  CityRouter,
  { path: '/', redirect: '/films' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
