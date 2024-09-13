import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { FacebookIcon, GoogleIcon, SitemarkIcon } from "./CustomIcons"
import ForgotPassword from "./ForgotPassword"
// import AppTheme from "../shared-theme/AppTheme"
// import ColorModeSelect from "../shared-theme/ColorModeSelect"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link as RouterLink } from "react-router-dom"
import Link from "@mui/material/Link"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}))

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SignInContainer direction='column' justifyContent='space-between'>
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <Card variant='outlined'>
        <SitemarkIcon />
        <Typography component='h1' variant='h4' sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Ingresar
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}>
          <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <TextField
              id='email'
              error={!!errors.email}
              helperText={errors.email?.message}
              type='email'
              placeholder='your@email.com'
              autoComplete='email'
              autoFocus
              required
              fullWidth
              variant='outlined'
              color={errors.email ? "error" : "primary"}
              sx={{ ariaLabel: "email" }}
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor='password'>Contraseña</FormLabel>
              <Link component='button' onClick={handleClickOpen} variant='body2' sx={{ alignSelf: "baseline" }}>
                Olvido su contraseña?
              </Link>
            </Box>
            <TextField
              id='password'
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder='••••••'
              type='password'
              autoComplete='current-password'
              autoFocus
              required
              fullWidth
              variant='outlined'
              color={errors.password ? "error" : "primary"}
              {...register("password")}
            />
          </FormControl>
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type='submit' fullWidth variant='contained'>
            Ingresar
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            No tienes una cuenta?{" "}
            <span>
              <Link component={RouterLink} to='/auth/register' variant='body2' sx={{ alignSelf: "center" }}>
                Registrase
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider>o</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}>
            Sign in with Facebook
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  )
}
