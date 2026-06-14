<script setup lang="ts">
const { data } = await useAsyncData("website-global", async () => {
  return await $fetch("/api/global");
});

if (data.value) {
  const favicon = data.value.favicon ? data.value.favicon : `${window.location.host}/favicon.ico`;
  const title = data.value.seo?.metaTitle || data.value.siteName || "";
  const description = data.value.seo?.metaDescription || data.value.siteDescription || "";

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogSiteName: data.value.siteName
  });

  useHead({
    link: [
      {
        rel: "icon",
        href: favicon
      }
    ]
  });
}
</script>

<template>
  <div class="p-2 min-h-screen flex flex-col">
    <div v-if="data" id="nav" class="flex mb-3 justify-center">
      <h1 class="text-3xl font-bold">
        {{ data.siteName }}
      </h1>
    </div>
    <div v-if="data" id="body" class="grow flex justify-center">
      <p>
        {{ data.siteDescription }}
      </p>
    </div>
    <div v-if="data" id="footer" class="flex justify-center">
      <small class="underline">
        {{ data.siteName }}
      </small>
    </div>
  </div>
</template>
