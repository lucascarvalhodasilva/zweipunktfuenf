export default function sitemap() {
  const base = 'https://www.zweipunktfuenf.de'

  const leistungenSlugs = [
    'web-14-tagen',
    'web-individuell',
    'web-features',
    'web-optimierung',
    'ki-chatbot',
  ]

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/leistungen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...leistungenSlugs.map((slug) => ({
      url: `${base}/leistungen/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
