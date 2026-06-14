export default defineEventHandler(async (event): Promise<Website> => {
  const { backendBaseUrl, backendApiToken } = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${backendBaseUrl}/api/global?populate=favicon&populate=defaultSeo`, {
      headers: {
        Authorization: `Bearer ${backendApiToken}`
      }
    });

    const data = (res as any).data;

    console.warn({
      data
    });

    return {
      siteName: data.siteName,
      siteDescription: data.siteDescription,
      favicon: data.favicon ? `${backendBaseUrl}${data.favicon?.url}` : undefined,
      seo: data.defaultSeo
        ? { metaTitle: data.defaultSeo.metaTitle, metaDescription: data.defaultSeo.metaDescription }
        : undefined
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch global data: ${(error as Error).message}`
    });
  }
});
