interface BlogViewsProps {
  views?: number
}

export default function BlogViews({ views }: BlogViewsProps) {
  if (views) {
    return <span> • {views} views</span>
  }

  return <span />
}
