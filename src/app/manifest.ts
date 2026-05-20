
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildKhata',
    short_name: 'BuildKhata',
    description: 'Premium Fintech for Architects',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#DAB958',
    icons: [
      {
        src: 'https://picsum.photos/seed/buildlogo/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/buildlogo/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
