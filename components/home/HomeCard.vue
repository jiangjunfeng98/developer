<template>
  <div class="home">
    <div class="title">{{ zh.title }}</div>
    <div>{{ zh.time }}</div>
    <div class="list">
      <div v-for="user in zh.list">
        <div v-for="p in user.project" class="home-card">
          <div>{{ p.name }}</div>
          <div>{{ p.description }}</div>
          <div>{{ user.submitter.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import zh from "../data/zh.json";
</script>

<style scoped>
.title {
  font-size: 24px;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.home-card {
  width: 300px;
  height: 250px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
