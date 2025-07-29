import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'

type ArticleCardProps = {
  title: string
  fromToday: string
  userName: string
  userImage?: string
  articleImage?: string
}

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const ArticleCard = (props: ArticleCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {props.articleImage && (
        <CardMedia sx={{ height: 140, position: 'relative' }}>
          <Image
            src={props.articleImage}
            alt={props.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          component="h3"
          sx={{
            mb: 2,
            minHeight: 48,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5,
            flexGrow: 1
          }}
        >
          {omit(props.title)(45)('...')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={props.userImage || undefined} 
              sx={{ width: 24, height: 24, fontSize: 12 }}
            >
              {!props.userImage && <PersonIcon fontSize="small" />}
            </Avatar>
            <Typography sx={{ fontSize: 12 }}>{props.userName}</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, color: '#666' }}>{props.fromToday}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
