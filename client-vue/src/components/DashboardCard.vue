<template>
  <div class="bg-card text-card-foreground rounded-lg border border-border p-6 shadow-sm">
    <div class="flex items-center justify-between space-y-0 pb-2">
      <h3 class="text-sm font-medium">{{ title }}</h3>
      <div class="h-4 w-4 text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20m10-10H2"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <div class="text-2xl font-bold">{{ count }}</div>
      <p class="text-xs text-muted-foreground">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  count: number
}

defineProps<Props>()
</script>