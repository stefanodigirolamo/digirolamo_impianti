import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'digirolamoimpianti',
    short_name: 'digirolamoimpianti',
    description: 'digirolamoimpianti',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/dgi.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}