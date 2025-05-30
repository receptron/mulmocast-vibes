
<template>
  <div id="app" class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <header class="border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-blue-600 dark:text-blue-400">MulmoCast Vue Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Vue 3 + TypeScript + Composition API</p>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium">プロジェクト管理</h3>
            <div class="h-4 w-4 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20m10-10H2"/>
              </svg>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl font-bold">{{ projectCount }}</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Vue 3とComposition APIを使用したプロジェクト管理機能</p>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium">メディア生成</h3>
            <div class="h-4 w-4 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20m10-10H2"/>
              </svg>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl font-bold">{{ mediaCount }}</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">リアルタイムメディア生成とプレビュー機能</p>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium">チャット機能</h3>
            <div class="h-4 w-4 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20m10-10H2"/>
              </svg>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-2xl font-bold">{{ chatCount }}</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Socket.ioを使用したリアルタイムチャット</p>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">機能テスト</h2>
        <div class="space-x-4">
          <button 
            @click="incrementProject"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            プロジェクト追加
          </button>
          <button 
            @click="incrementMedia"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            メディア生成
          </button>
          <button 
            @click="incrementChat"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            チャット送信
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const projectCount = ref(0)
const mediaCount = ref(0)
const chatCount = ref(0)

const incrementProject = () => {
  projectCount.value++
}

const incrementMedia = () => {
  mediaCount.value++
}

const incrementChat = () => {
  chatCount.value++
}
</script>
