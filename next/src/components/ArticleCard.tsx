import {
  ArticleIcon,
  PersonIcon,
  CodeIcon,
  LightbulbIcon,
  RocketIcon
} from '@/components/icons/LightweightIcons'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import Image from 'next/image'

type ArticleCardProps = {
  id: number
  title: string
  fromToday: string
  userName: string
  userImage?: string
  articleImage?: string
}

const getRandomIcon = (id: number) => {
  const icons = [
    CodeIcon,
    ArticleIcon,
    LightbulbIcon,
    RocketIcon,
    ArticleIcon, // WebIconの代替
    CodeIcon,    // StorageIconの代替  
    ArticleIcon, // BugReportIconの代替
    LightbulbIcon // SchoolIconの代替
  ]
  const IconComponent = icons[id % icons.length]
  return <IconComponent />
}

const getRandomGradient = (id: number) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)'
  ]
  return gradients[id % gradients.length]
}

const ArticleCard = (props: ArticleCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e1e8ed',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      }}
    >
      {props.articleImage ? (
        <CardMedia sx={{ height: 200, position: 'relative' }}>
          <Image
            src={props.articleImage}
            alt={props.title}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
          />
        </CardMedia>
      ) : (
        <Box
          sx={{
            height: 200,
            background: getRandomGradient(props.id),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            '& svg': {
              fontSize: 80,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }
          }}
        >
          {getRandomIcon(props.id)}
        </Box>
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          '&:last-child': { pb: 3 }
        }}
      >
        <Typography
          component="h2"
          sx={{
            mb: 2,
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.4,
            color: '#1a1a1a',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 50
          }}
        >
          {props.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={props.userImage || undefined}
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                border: '2px solid #f0f0f0'
              }}
            >
              {!props.userImage && <PersonIcon fontSize="small" />}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#333',
                  lineHeight: 1.2
                }}
              >
                {props.userName}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#888',
                  lineHeight: 1.2
                }}
              >
                {props.fromToday}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
