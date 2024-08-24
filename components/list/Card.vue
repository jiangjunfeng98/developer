<template>
  <div class="home">
    <div class="title">{{ zh.title }}</div>
    <div>{{ zh.time }}</div>
    <div class="list">
      <div v-for="p in zh.list" class="home-card" :key="p.id">
        <div class="name">{{ p.name }}</div>
        <div class="description">{{ p.description }}</div>
        <div>{{ p.submitter.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useData } from 'vitepress'
import zh from "../data/zh.json";
const { params } = useData()

console.log(params.value)
</script>

<style scoped>
.title {
  font-size: 30px;
  margin-bottom: 5px;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
}

.home-card {
  width: 300px;
  height: 250px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.home-card:hover {
  background-color: #f5f7fa;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.description {
  margin-top: 10px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 限制在2行 */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
