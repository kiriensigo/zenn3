import { Button, ButtonProps, CircularProgress } from '@mui/material'

interface LightweightLoadingButtonProps extends ButtonProps {
  loading?: boolean
  children: React.ReactNode
}

const LightweightLoadingButton = ({ 
  loading = false, 
  disabled, 
  children, 
  ...props 
}: LightweightLoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
    >
      {children}
    </Button>
  )
}

export default LightweightLoadingButton