import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center">
      <h1 className="text-6xl font-extrabold font-headline text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Сторінку не знайдено</h2>
      <p className="text-muted-foreground mb-8">На жаль, ми не змогли знайти сторінку, яку ви шукаєте.</p>
      <Button asChild>
        <Link href="/">Повернутися на головну</Link>
      </Button>
    </div>
  )
}
