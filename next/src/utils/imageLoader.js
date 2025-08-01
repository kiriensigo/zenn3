/**
 * カスタム画像ローダー
 * static exportでも画像最適化を実現するためのローダー
 */
export default function imageLoader({ src, width: _width, quality: _quality }) {
  // 開発環境では元の画像をそのまま返す
  if (process.env.NODE_ENV === 'development') {
    return src
  }

  // プロダクション環境では画像最適化サービスのURLを生成
  // 実際のサービス（Cloudinary、ImageKit等）に応じて変更してください

  // 現在は元の画像を返しますが、将来的に画像CDNを使用する場合の準備
  // const params = new URLSearchParams({
  //   url: src,
  //   w: width.toString(),
  //   q: (quality || 75).toString()
  // })

  // 例: Vercel Image Optimization
  // return `https://your-domain.vercel.app/_next/image?${params}`

  // 例: Cloudinary
  // return `https://res.cloudinary.com/your-cloud/image/fetch/w_${width},q_${quality || 75},f_auto/${encodeURIComponent(src)}`

  // 現在は元画像を返す（将来の拡張に備えた構造）
  return src
}
