import { useMutation } from '@tanstack/react-query';
import { login } from '../pages/login/services/login.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: () => {
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });
};
