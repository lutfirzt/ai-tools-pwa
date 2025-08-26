export function generateStaticParams() {
  return [{ toolId: 'image-prompt' }]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
