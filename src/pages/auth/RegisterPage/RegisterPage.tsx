import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { z } from "zod"
import { FacebookIcon, GoogleIcon, SitemarkIcon } from "../LoginPage/CustomIcons"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}))

const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

type SignUpFormData = z.infer<typeof SignUpSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data)
  }
  return (
    <SignUpContainer direction='column' justifyContent='space-between'>
      <Stack
        sx={{
          justifyContent: "center",
          height: "100dvh",
          p: 2,
        }}>
        <Card variant='outlined'>
          <SitemarkIcon />
          <Typography component='h1' variant='h4' sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
            Registrarse
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor='name'>Nombre completo</FormLabel>
              <TextField
                id='name'
                autoComplete='name'
                required
                fullWidth
                placeholder='Jon Snow'
                error={!!errors.name}
                helperText={errors.name?.message}
                color={errors.name ? "error" : "primary"}
                {...register("name")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                id='email'
                required
                fullWidth
                placeholder='your@email.com'
                autoComplete='email'
                variant='outlined'
                error={!!errors.email}
                helperText={errors.email?.message}
                color={errors.email ? "error" : "primary"}
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                id='password'
                required
                fullWidth
                placeholder='••••••'
                type='password'
                autoComplete='new-password'
                variant='outlined'
                error={!!errors.password}
                helperText={errors.password?.message}
                color={errors.password ? "error" : "primary"}
                {...register("password")}
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value='allowExtraEmails' color='primary' />}
              label='I want to receive updates via email.'
            /> */}
            <Button type='submit' fullWidth variant='contained'>
              Registrarse
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Ya tienes una cuenta?{" "}
              <span>
                <Link component={RouterLink} to='/auth/login' variant='body2' sx={{ alignSelf: "center" }}>
                  Ingresar
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}>
              Sign up with Google
            </Button>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}>
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </Stack>
    </SignUpContainer>
  )
}
