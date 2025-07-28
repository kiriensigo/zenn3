import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  Input
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'

type ProfileFormData = {
  name: string
  image: string
}

const CurrentProfile: NextPage = () => {
  useRequireSignedIn()
  const [user, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [imagePreview, setImagePreview] = useState<string | null>(user.image)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { handleSubmit, control, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      image: user.image || ''
    }
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // ファイルサイズチェック (5MB制限)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          message: '画像サイズは5MB以下にしてください',
          severity: 'error',
          pathname: '/current/profile'
        })
        return
      }

      // 画像形式チェック
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          message: '画像ファイルを選択してください',
          severity: 'error',
          pathname: '/current/profile'
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

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)

    try {
      const headers = {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid')
      }

      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'
      const response = await axios.patch(url, { user: data }, { headers })

      // ユーザー情報を更新
      setUser({
        ...response.data,
        isSignedIn: true,
        isFetched: true
      })

      setSnackbar({
        message: 'プロフィールを更新しました',
        severity: 'success',
        pathname: '/current/profile'
      })
    } catch (error) {
      console.error(error)
      setSnackbar({
        message: 'プロフィールの更新に失敗しました',
        severity: 'error',
        pathname: '/current/profile'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>プロフィール設定 - TechLog</title>
      </Head>
      <Box
        css={styles.pageMinHeight}
        sx={{
          backgroundColor: '#EDF2F7',
          py: 4
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              component="h1"
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                mb: 4,
                textAlign: 'center'
              }}
            >
              プロフィール設定
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* プロフィール画像 */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={imagePreview || undefined}
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 48
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      boxShadow: 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                  <Input
                    inputRef={fileInputRef}
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleImageChange}
                    sx={{ display: 'none' }}
                  />
                </Box>
              </Box>

              {/* 名前 */}
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'ユーザー名を入力してください。'
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="ユーザー名"
                    variant="outlined"
                    fullWidth
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              {/* 送信ボタン */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                sx={{ py: 1.5 }}
              >
                {isLoading ? '更新中...' : '更新する'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default CurrentProfile