export default defineEventHandler((event) => {
  const { backendApiToken, backendBaseUrl } = useRuntimeConfig(event);

  if (!backendApiToken || backendApiToken.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_BACKEND_API_TOKEN must be set in the runtime config.",
      fatal: true
    });
  }

  if (!backendBaseUrl || backendBaseUrl.trim().length === 0) {
    throw createError({
      statusCode: 503,
      statusMessage: "NUXT_BACKEND_BASE_URL must be set in the runtime config.",
      fatal: true
    });
  }
});
