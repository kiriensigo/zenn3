import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Tooltip,
  Typography,
  IconButton
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type ArticleProps = {
  id: number
  title: string
  status: string
}

const CurrentArticles: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<ArticleProps | null>(
    null
  )

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles'
  const { data, error, mutate } = useSWR(user.isSignedIn ? url : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const articles: ArticleProps[] = camelcaseKeys(data)

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return

    try {
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid')
      }

      const deleteUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL +
        '/current/articles/' +
        articleToDelete.id

      await axios.delete(deleteUrl, { headers })

      // データを再取得
      mutate()

      setSnackbar({
        message: '記事を削除しました',
        severity: 'success',
        pathname: '/current/articles'
      })

      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    } catch (e) {
      console.error(e)
      setSnackbar({
        message: '記事の削除に失敗しました',
        severity: 'error',
        pathname: '/current/articles'
      })
    }
  }

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        borderTop: '0.5px solid #acbcc7',
        pb: 8
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, px: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography component="h2" sx={{ fontSize: 32, fontWeight: 'bold' }}>
            記事の管理
          </Typography>
        </Box>

        {articles.map((article: ArticleProps, i: number) => (
          <>
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 80
              }}
            >
              <Box sx={{ width: 'auto', pr: 3 }}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  {article.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  minWidth: 240,
                  width: 240,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <>
                  {article.status == '下書き' && (
                    <Box
                      sx={{
                        display: 'inline',
                        fontSize: 12,
                        textAlgin: 'center',
                        border: '1px solid #9FAFBA',
                        p: '4px',
                        borderRadius: 1,
                        color: '#9FAFBA',
                        fontWeight: 'bold'
                      }}
                    >
                      {article.status}
                    </Box>
                  )}
                  {article.status == '公開中' && (
                    <Box
                      sx={{
                        display: 'inline',
                        fontSize: 12,
                        textAlgin: 'center',
                        border: '1px solid #3EA8FF',
                        p: '4px',
                        borderRadius: 1,
                        color: '#3EA8FF',
                        fontWeight: 'bold'
                      }}
                    >
                      {article.status}
                    </Box>
                  )}
                </>
                <Box>
                  <Link href={'/current/articles/edit/' + article.id}>
                    <Avatar>
                      <Tooltip title="編集する">
                        <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                          <EditIcon sx={{ color: '#99AAB6' }} />
                        </IconButton>
                      </Tooltip>
                    </Avatar>
                  </Link>
                </Box>
                <Box>
                  <Avatar>
                    <Tooltip title="削除する">
                      <IconButton
                        sx={{ backgroundColor: '#F1F5FA' }}
                        onClick={() => {
                          setArticleToDelete(article)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <DeleteIcon sx={{ color: '#99AAB6' }} />
                      </IconButton>
                    </Tooltip>
                  </Avatar>
                </Box>
                <Box>
                  <Link href={'/current/articles/' + article.id}>
                    <Avatar>
                      <Tooltip title="表示を確認">
                        <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                          <ChevronRightIcon sx={{ color: '#99AAB6' }} />
                        </IconButton>
                      </Tooltip>
                    </Avatar>
                  </Link>
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
        ))}
      </Container>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>記事を削除しますか？</DialogTitle>
        <DialogContent>
          <Typography>
            「{articleToDelete?.title}」を削除します。
            この操作は取り消せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            キャンセル
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CurrentArticles