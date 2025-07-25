import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import * as React from 'react'
import '@/styles/destyle.css'
import CurrentUserFetch from '@/components/CurrentUserFetch'
import Header from '@/components/Header'
import Snackbar from '@/components/Snackbar'
import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'
import axios from 'axios'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // APIサーバーのウォームアップ（Renderのスリープ対策）
  React.useEffect(() => {
    const warmupAPI = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/health_check'
        await axios.get(apiUrl, { timeout: 5000 })
      } catch (error) {
        // エラーは無視（ヘルスチェック目的のため）
      }
    }

    // 初回ロード時にAPIを呼び出し
    warmupAPI()

    // 10分ごとにAPIを呼び出してスリープを防ぐ
    const interval = setInterval(warmupAPI, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <CurrentUserFetch />
        <Header />
        <Component {...pageProps} />
        <Snackbar />
      </ThemeProvider>
    </CacheProvider>
  )
}
