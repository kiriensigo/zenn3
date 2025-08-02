import {
  ChevronLeftIcon as ArrowBackSharpIcon,
  PhotoCameraIcon
} from '@/components/icons/LightweightIcons'
import LightweightLoadingButton from '@/components/LightweightLoadingButton'
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Input,
  Switch,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo, useRef } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  content: string
  status: string
  image: string | null
}

type ArticleFormData = {
  title: string
  content: string
  image: string
}

const CurrentArticlesEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [previewChecked, setPreviewChecked] = useState<boolean>(false)
  const [statusChecked, setStatusChecked] = useState<boolean>(false)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChangePreviewChecked = () => {
    setPreviewChecked(!previewChecked)
  }

  const handleChangeStatusChecked = () => {
    setStatusChecked(!statusChecked)
  }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles/'
  const { id } = router.query
  const { data, error } = useSWR(
    user.isSignedIn && id ? url + id : null,
    fetcher
  )

  const article: ArticleProps = useMemo(() => {
    if (!data) {
      return {
        title: '',
        content: '',
        status: false,
        image: null
      }
    }
    return {
      title: data.title == null ? '' : data.title,
      content: data.content == null ? '' : data.content,
      status: data.status,
      image: data.image || null
    }
  }, [data])

  const { handleSubmit, control, reset, watch, setValue } =
    useForm<ArticleFormData>({
      defaultValues: {
        title: '',
        content: '',
        image: ''
      }
    })

  useEffect(() => {
    if (data) {
      reset({
        title: article.title,
        content: article.content,
        image: article.image || ''
      })
      setStatusChecked(article.status == '公開中')
      setImagePreview(article.image)
      setIsFetched(true)
    }
  }, [data, article, reset])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // ファイルサイズチェック (5MB制限)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          message: '画像サイズは5MB以下にしてください',
          severity: 'error',
          pathname: '/current/articles/edit/' + id
        })
        return
      }

      // 画像形式チェック
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          message: '画像ファイルを選択してください',
          severity: 'error',
          pathname: '/current/articles/edit/' + id
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setValue('image', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setValue('image', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
    if (data.title == '') {
      return setSnackbar({
        message: '記事の保存にはタイトルが必要です',
        severity: 'error',
        pathname: '/current/articles/edit/[id]'
      })
    }

    if (statusChecked && data.content == '') {
      return setSnackbar({
        message: '本文なしの記事は公開はできません',
        severity: 'error',
        pathname: '/current/articles/edit/[id]'
      })
    }

    setIsLoading(true)

    const patchUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles/' + id

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid')
    }

    const status = statusChecked ? 'published' : 'draft'

    const patchData = { ...data, status: status }

    axios({
      method: 'PATCH',
      url: patchUrl,
      data: patchData,
      headers: headers
    })
      .then(() => {
        setSnackbar({
          message: '記事を保存しました',
          severity: 'success',
          pathname: '/current/articles/edit/[id]'
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '記事の保存に失敗しました',
          severity: 'error',
          pathname: '/current/articles/edit/[id]'
        })
      })
    setIsLoading(false)
  }

  if (error) return <Error />
  if (!data || !isFetched) return <Loading />

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: '#EDF2F7', minHeight: '100vh' }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#EDF2F7'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: 50 }}>
            <Link href="/current/articles">
              <IconButton>
                <ArrowBackSharpIcon />
              </IconButton>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: '0 16px', sm: '0 24px' }
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Switch
                checked={previewChecked}
                onChange={handleChangePreviewChecked}
              />
              <Typography sx={{ fontSize: { xs: 12, sm: 15 } }}>
                プレビュー表示
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Switch
                checked={statusChecked}
                onChange={handleChangeStatusChecked}
              />
              <Typography sx={{ fontSize: { xs: 12, sm: 15 } }}>
                下書き／公開
              </Typography>
            </Box>
            <LightweightLoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: 12, sm: 16 }
              }}
            >
              更新する
            </LightweightLoadingButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          pt: 11,
          pb: 3,
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, sm: 3 }
        }}
      >
        {!previewChecked && (
          <Box sx={{ width: { xs: '100%', sm: 840 } }}>
            <Box sx={{ mb: 2 }}>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder="タイトルを入力してください"
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
            </Box>

            {/* 画像アップロード */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
                記事画像
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  画像を選択
                </Button>
                {imagePreview && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={removeImage}
                    size="small"
                  >
                    削除
                  </Button>
                )}
                <Input
                  inputRef={fileInputRef}
                  type="file"
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleImageChange}
                  sx={{ display: 'none' }}
                />
              </Box>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Image
                    src={imagePreview}
                    alt="プレビュー"
                    width={300}
                    height={200}
                    style={{
                      maxWidth: '300px',
                      maxHeight: '200px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box>
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="textarea"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    multiline
                    fullWidth
                    placeholder="記事の内容をMarkdown形式で入力してください"
                    rows={25}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
            </Box>
          </Box>
        )}
        {previewChecked && (
          <Box sx={{ width: { xs: '100%', sm: 840 } }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: 'bold',
                textAlign: 'center',
                pt: 2,
                pb: 4
              }}
            >
              {watch('title')}
            </Typography>
            <Card sx={{ boxShadow: 'none', borderRadius: '12px' }}>
              <Box
                sx={{
                  padding: { xs: '0 24px 24px 24px', sm: '0 40px 40px 40px' },
                  marginTop: { xs: '24px', sm: '40px' }
                }}
              >
                {(imagePreview || watch('image')) && (
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Image
                      src={imagePreview || watch('image')}
                      alt={watch('title') || 'プレビュー'}
                      width={600}
                      height={400}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  </Box>
                )}
                <MarkdownText content={watch('content')} />
              </Box>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default CurrentArticlesEdit
