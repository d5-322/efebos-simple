"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Post } from '@/types/post'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'

interface PostCardProps {
  post: Post
  onLike: () => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const router = useRouter()
  const { user } = useAuth() // Supabaseの認証状態を取得
  
  const handleClick = () => {
    // 認証状態に応じて遷移先を変更
    if (user) {
      router.push(`/posts/${post.id}`)
    } else {
      router.push('/signup') // SignUpFormコンポーネントのパスに合わせて変更
    }
  }

  // ユーザー名クリックのハンドラ
  const handleUsernameClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (user) {
      router.push(`/profile/${post.user_id}`)
    } else {
      router.push('/signup')
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', ' '].includes(e.key)) handleClick()
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // いいね機能も認証済みユーザーのみに制限
    if (user) {
      onLike()
    } else {
      e.preventDefault()
      router.push('/signup')
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition overflow-hidden"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4">
        <span 
          role="button"
          onClick={handleUsernameClick}
          className="text-sm font-medium text-gray-700 hover:text-primary cursor-pointer"
        >
          {post.username}
        </span>
        <div className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* 画像 */}
      <div className="relative aspect-video">
        <Image
          src={post.image_url}
          alt={`Post by ${post.username}`}
          fill
          className="object-cover bg-gray-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* フッター */}
      <div className="p-4 flex items-center justify-between">
        <span className="line-clamp-2 text-sm whitespace-pre-line font-medium text-gray-700">
          {post.description}
        </span>
        
        <Button
          variant="ghost"
          onClick={handleLikeClick}
          className="gap-1.5 hover:bg-red-50"
          aria-label={post.is_liked ? 'Unlike post' : 'Like post'}
        >
          <Heart
            className={`h-5 w-5 ${
              post.is_liked 
                ? 'fill-red-500 text-red-600' 
                : 'text-gray-600'
            }`}
          />
          <span className="text-sm text-gray-700">
            {post.likes_count}
          </span>
        </Button>
      </div>
    </div>
  )
}