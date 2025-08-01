import {
  ArticleIcon,
  EditIcon,
  PersonIcon
} from '@/components/icons/LightweightIcons'
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { useUserState } from '@/hooks/useGlobalState'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  content: string
  createdAt: string
  updatedAt: string
  image: string | null
  user: {
    id: number
    name: string
  }
}

const ArticleDetail: NextPage = () => {
  const router = useRouter()
  const [user] = useUserState()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/'
  const { id } = router.query

  const { data, error } = useSWR(id ? url + id : null, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const article: ArticleProps = camelcaseKeys(data)
  const isAuthor = user.isSignedIn && user.id === article.user.id

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        pb: 6,
        minHeight: 'calc(100vh - 57px)'
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          alignItems: 'center',
          backgroundColor: 'white',
          borderTop: '0.5px solid #acbcc7',
          height: 56,
          pl: 4,
          color: '#6e7b85'
        }}
      >
        <Box sx={{ pr: 1 }}>
          <PersonIcon />
        </Box>
        <Box sx={{ mr: 2 }}>
          <Typography component="p">著者:</Typography>
        </Box>
        <Typography component="p" sx={{ fontWeight: 'bold', color: 'black' }}>
          {article.user.name}
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6, pb: 3 }}>
          <Box sx={{ maxWidth: 840, m: 'auto', textAlign: 'center' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: 'bold',
                mb: isAuthor ? 2 : 0
              }}
            >
              {article.title}
            </Typography>
            {isAuthor && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Link href={`/current/articles/edit/${id}`}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{
                      borderColor: '#3EA8FF',
                      color: '#3EA8FF',
                      '&:hover': {
                        backgroundColor: '#3EA8FF',
                        color: 'white'
                      }
                    }}
                  >
                    記事を編集
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
          <Typography
            component="p"
            align="center"
            sx={{
              display: {
                xs: 'block',
                lg: 'none'
              },
              color: '#6e7b85',
              mt: '20px'
            }}
          >
            {article.createdAt}に公開
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '0 24px' }}>
          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                boxShadow: 'none',
                borderRadius: '12px',
                maxWidth: 840,
                m: '0 auto'
              }}
            >
              <Box
                sx={{
                  padding: { xs: '0 24px 24px 24px', sm: '0 40px 40px 40px' },
                  marginTop: { xs: '24px', sm: '40px' }
                }}
              >
                {article.image && (
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={600}
                      height={400}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
                    />
                  </Box>
                )}
                <MarkdownText content={article.content} />
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              width: 300,
              minWidth: 300
            }}
          >
            <Card sx={{ boxShadow: 'none', borderRadius: '12px' }}>
              <List sx={{ color: '#6e7b85' }}>
                <ListItem divider>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ pr: 1 }}>
                        <PersonIcon />
                      </Box>
                      <ListItemText primary="著者" />
                    </Box>
                    <Box>
                      <ListItemText primary={article.user.name} />
                    </Box>
                  </Box>
                </ListItem>
                <ListItem divider>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ pr: 1 }}>
                        <ArticleIcon />
                      </Box>
                      <ListItemText primary="公開" />
                    </Box>
                    <Box>
                      <ListItemText primary={article.createdAt} />
                    </Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ pr: 1 }}>
                        <ArticleIcon />
                      </Box>
                      <ListItemText primary="本文更新" />
                    </Box>
                    <Box>
                      <ListItemText primary={article.updatedAt} />
                    </Box>
                  </Box>
                </ListItem>
              </List>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ArticleDetail
