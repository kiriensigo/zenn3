import { Box, Container, Typography, Stack, Paper } from '@mui/material'
import type { NextPage } from 'next'
import { styles } from '@/styles'

const About: NextPage = () => {
  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#EDF2F7',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              component="h1"
              sx={{ 
                fontSize: { xs: 28, md: 36 }, 
                color: 'black', 
                fontWeight: 'bold',
                mb: 2
              }}
            >
              TechLogについて
            </Typography>
            <Typography
              sx={{ 
                fontSize: { xs: 16, md: 18 },
                color: '#666',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              エンジニアのための技術ナレッジシェアコミュニティ
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, fontWeight: 'bold', mb: 3, color: '#333' }}
            >
              TechLogとは
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.8, color: '#555', mb: 3 }}>
              TechLogは、エンジニアが学んだ技術や知見を気軽に共有できるプラットフォームです。
              プログラミング学習の記録から、実務で得た技術的洞察まで、
              あらゆる技術情報を記事として投稿・共有することができます。
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>
              マークダウン記法で書きやすく、読みやすい記事作成環境を提供し、
              エンジニア同士の知識交換とスキルアップをサポートします。
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, fontWeight: 'bold', mb: 3, color: '#333' }}
            >
              こんな方におすすめ
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography sx={{ color: '#3EA8FF', fontWeight: 'bold', mr: 2 }}>
                  ✓
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555' }}>
                  プログラミング学習の過程を記録したい
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography sx={{ color: '#3EA8FF', fontWeight: 'bold', mr: 2 }}>
                  ✓
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555' }}>
                  技術的な発見や解決方法を共有したい
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography sx={{ color: '#3EA8FF', fontWeight: 'bold', mr: 2 }}>
                  ✓
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555' }}>
                  他のエンジニアの知見から学びたい
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography sx={{ color: '#3EA8FF', fontWeight: 'bold', mr: 2 }}>
                  ✓
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555' }}>
                  技術記事を書く習慣を身につけたい
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, fontWeight: 'bold', mb: 3, color: '#333' }}
            >
              特徴
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 1, color: '#333' }}>
                  シンプルな記事作成
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555', lineHeight: 1.7 }}>
                  マークダウン記法で直感的に記事を作成できます。
                  コードブロックやリストなど、技術記事に必要な要素を簡単に記述できます。
                </Typography>
              </Box>
              
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 1, color: '#333' }}>
                  読みやすいデザイン
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555', lineHeight: 1.7 }}>
                  技術記事に最適化されたデザインで、コードや図表が見やすく表示されます。
                  集中して学習できる環境を提供します。
                </Typography>
              </Box>
              
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 1, color: '#333' }}>
                  コミュニティ
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#555', lineHeight: 1.7 }}>
                  エンジニア同士で技術情報を共有し、お互いの成長をサポートする
                  コミュニティを目指しています。
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
            <Typography
              sx={{ 
                fontSize: 18, 
                color: '#555',
                fontStyle: 'italic',
                lineHeight: 1.8
              }}
            >
              「学んだことを記録し、知識を共有する。」<br />
              エンジニアの成長を支える技術記事プラットフォーム
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}

export default About