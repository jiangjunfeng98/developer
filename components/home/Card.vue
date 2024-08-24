<template>
  <div class="home">
    <div class="list">
      <a v-for="p in countryList" class="home-card" :key="p.code" :href="`/list?country=${p.code}`">
        <div class="name">{{ p.name }}</div>
        <div class="en">{{ p.en }}</div>
      </a>
    </div>
  </div>
</template>
<script setup>
const countryList = [{ name: "中国", en: "China", code: "zh" }]
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
  width: 200px;
  height: 150px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
  text-decoration: none;
}

.home-card:hover {
  background-color: #f5f7fa;
}

.name {
  font-size: larger;
  font-weight: bolder;
}

.en {
  margin-top: 15px;
}
</style>
