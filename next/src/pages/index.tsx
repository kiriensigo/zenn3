import { Box, Grid, Container, Pagination } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ArticleCard from '@/components/ArticleCard'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type ArticleProps = {
  id: number
  title: string
  createdAt: string
  fromToday: string
  image?: string
  user: {
    name: string
    image?: string
  }
}

const Index: NextPage = () => {
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/?page=' + page

  const { data, error } = useSWR(url, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const articles = camelcaseKeys(data.articles)
  const meta = camelcaseKeys(data.meta)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value)
  }

  return (
    <>
      <Head>
        <title>TechLog - エンジニアのための技術ナレッジシェア</title>
        <meta
          name="description"
          content="エンジニアが学んだ技術や知見を気軽に共有できるプラットフォーム"
        />
      </Head>
      <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg" sx={{ pt: 6, px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {articles.map((article: ArticleProps, i: number) => (
              <Grid key={i} item xs={12} sm={6} lg={4}>
                <Link href={'/articles/' + article.id} style={{ textDecoration: 'none' }}>
                  <ArticleCard
                    id={article.id}
                    title={article.title}
                    fromToday={article.fromToday}
                    userName={article.user.name}
                    userImage={article.user.image}
                    articleImage={article.image}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <Pagination
              count={meta.totalPages}
              page={meta.currentPage}
              onChange={handleChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Index
