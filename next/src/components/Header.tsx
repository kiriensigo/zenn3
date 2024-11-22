import ArticleIcon from '@mui/icons-material/Article'
import Logout from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material'import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserState } from "@/hooks/useGlobalState";

const Header = () => {
  const [user] = useRouter()
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        py: "12px",
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Link href="/">
              <Image src="/logo.png" width={133} height={40} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/sign_in">
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 16,
                        borderRadius: 2,
                        boxShadow: "none",
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontSize: 16,
                      borderRadius: 2,
                      boxShadow: "none",
                      border: "1.5px solid #3EA8FF",
                      ml: 2,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
     setAnchorEl(null)
   }
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
