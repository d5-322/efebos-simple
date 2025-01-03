export interface Post {
  id: string
  user_id: string
  image_url: string
  description: string
  user_type: 'guitarist' | 'bassist'
  created_at: string
  likes_count: number
}
