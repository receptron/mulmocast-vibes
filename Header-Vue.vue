<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors duration-200">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo/Brand -->
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
        MulmoCast
      </h1>

      <!-- Navigation -->
      <nav class="flex items-center space-x-4">
        <!-- Dashboard Button -->
        <router-link 
          :to="dashboardItem.path"
          class="relative inline-flex items-center"
        >
          <button
            :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105',
              isDashboardActive 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            ]"
          >
            <HomeIcon class="w-4 h-4 mr-2" />
            {{ dashboardItem.label }}
            
            <!-- Status Badge -->
            <span 
              v-if="activeSessionCount > 0 || hasErrors"
              :class="[
                'absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center p-0 rounded-full text-xs font-bold animate-pulse',
                hasErrors 
                  ? 'bg-red-500 text-white' 
                  : 'bg-blue-500 text-white'
              ]"
            >
              <AlertTriangleIcon v-if="hasErrors" class="w-3 h-3" />
              <span v-else>{{ activeSessionCount }}</span>
            </span>
          </button>
        </router-link>

        <!-- Menu Dropdown -->
        <div class="relative" ref="dropdown">
          <button
            @click="toggleDropdown"
            class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          >
            <MenuIcon class="w-4 h-4" />
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
            >
              <div class="py-1">
                <router-link
                  v-for="item in menuItems"
                  :key="item.path"
                  :to="item.path"
                  @click="closeDropdown"
                  :class="[
                    'flex items-center px-4 py-2 text-sm transition-colors duration-150',
                    currentRoute === item.path
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <component :is="item.icon" class="w-4 h-4 mr-2" />
                  {{ item.label }}
                </router-link>
              </div>
            </div>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  BookOpen as BookOpenIcon,
  Users as UsersIcon,
  User as UserIcon,
  AlertTriangle as AlertTriangleIcon,
  Menu as MenuIcon
} from 'lucide-vue-next'

// Props
interface Props {
  activeSessionCount?: number
  hasErrors?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  activeSessionCount: 0,
  hasErrors: false
})

// Vue Router
const route = useRoute()
const currentRoute = computed(() => route.path)

// Navigation items
const dashboardItem = {
  path: '/',
  icon: HomeIcon,
  label: 'Dashboard'
}

const menuItems = [
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  { path: '/templates', icon: BookOpenIcon, label: 'Templates' },
  { path: '/guides', icon: UsersIcon, label: 'Guides' },
  { path: '/forum', icon: UsersIcon, label: 'Forum' },
  { path: '/profile', icon: UserIcon, label: 'Profile' },
]

// Computed properties
const isDashboardActive = computed(() => currentRoute.value === dashboardItem.path)

// Dropdown state
const isDropdownOpen = ref(false)
const dropdown = ref<HTMLElement>()

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
</template>