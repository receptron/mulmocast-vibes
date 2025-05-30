<template>
  <div id="app" class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-primary">MulmoCast Vue Dashboard</h1>
        <p class="text-muted-foreground mt-2">Vue 3 + TypeScript + Composition API</p>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="プロジェクト管理"
          description="Vue 3とComposition APIを使用したプロジェクト管理機能"
          :count="projectCount"
        />
        <DashboardCard 
          title="メディア生成"
          description="リアルタイムメディア生成とプレビュー機能"
          :count="mediaCount"
        />
        <DashboardCard 
          title="チャット機能"
          description="Socket.ioを使用したリアルタイムチャット"
          :count="chatCount"
        />
      </div>
      
      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">機能テスト</h2>
        <div class="space-y-4">
          <button 
            @click="incrementProject"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            プロジェクト追加
          </button>
          <button 
            @click="incrementMedia"
            class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors ml-4"
          >
            メディア生成
          </button>
          <button 
            @click="incrementChat"
            class="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors ml-4"
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
import DashboardCard from './components/DashboardCard.vue'

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

<style scoped>
/* Component-specific styles */
</style>