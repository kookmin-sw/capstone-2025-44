import { useEffect, useState } from 'react'

type NewsItem = {
  title: string
  summary: string
  link: string
}

const decodeHTML = (input: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = input
  return txt.value
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          '/naver-news/v1/search/news.json?query=정릉3동&display=6&sort=date',
          {
            headers: {
              'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
              'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
            },
          }
        )
        const data = await res.json()
        const items = data.items.map((item: any) => ({
          title: decodeHTML(item.title.replace(/<[^>]+>/g, '')),
          summary: decodeHTML(item.description.replace(/<[^>]+>/g, '')),
          link: item.link,
        }))
        setNews(items)
      } catch (err) {
        setError('뉴스를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading)
    return <p className="text-center text-gray-500 mt-10">⏳ 뉴스 불러오는 중...</p>
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jungneung.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay">
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40 to-transparent">
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-50 to-orange-400 drop-shadow-lg">
                    📰 정릉3동 최신 뉴스
                </span>
                </h1>
                <p className="text-amber-100 max-w-2xl mx-auto">
                    동네의 따뜻한 소식을 전해드리는 커뮤니티 보따리
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-amber-50/10 backdrop-blur-sm rounded-xl overflow-hidden border border-amber-200/20 hover:border-amber-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                    >
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-amber-50 mb-3 group-hover:text-amber-200 transition-colors">
                        {item.title}
                    </h2>
                    <p className="text-amber-100/80 text-sm leading-relaxed line-clamp-3">
                        {item.summary}
                    </p>
                    <div className="mt-4 text-orange-500 text-sm font-medium">
                        자세히 보기 →
                    </div>
                </div>
                    </a>
            ))}
            </div>
            <footer className="mt-16 text-center text-amber-200/60 text-sm">
                <p>
                    © {new Date().getFullYear()} 국민대학교 캡스톤디자인
                </p>
            </footer>
        </div>
    </div>
  )
}