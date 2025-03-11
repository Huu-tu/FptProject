import { login } from 'store/slices/userSlice';
import { useGetMyProfile } from './admin/useAdmin';

export const useReLogin = () => {
  const { data } = useGetMyProfile();
  if (data) login(data?.data);
};
