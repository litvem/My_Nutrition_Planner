import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import UserHome from './views/UserHome.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import AddRecipe from './views/AddRecipe.vue'
import WeeklyCalendar from './views/WeeklyCalendar.vue'
import ShoppingList from './views/ShoppingList.vue'
import RecipePage from './views/RecipePage.vue'
import test from './testingFolder/test.vue'
import AllPlans from './views/AllPlans.vue'
import EditRecipe from './views/EditRecipe.vue'
import AddShoppingList from './views/AddShoppingList.vue'
import EditshoppingList from './views/EditshoppingList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/userHome',
      name: 'userHome',
      component: UserHome
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/addRecipe',
      name: 'addRecipe',
      component: AddRecipe
    },
    {
      path: '/recipePage/:id',
      name: 'recipe-page',
      component: RecipePage
    },
    {
      path: '/editRecipe/:id',
      name: 'edit-recipe',
      component: EditRecipe
    },

    {
      path: '/weeklyCalendar',
      name: 'weeklyCalendar',
      component: WeeklyCalendar
    },
    {
      path: '/shoppingLists',
      name: 'shoppingList',
      component: ShoppingList
    },
    {
      path: '/editShoppingList/:id',
      name: 'edit-shopping-list',
      component: EditshoppingList
    },
    {
      path: '/addShoppingList',
      name: 'add-shopping-list',
      component: AddShoppingList
    },

    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/allPlans',
      name: 'allPlans',
      component: AllPlans
    }
  ]
})
