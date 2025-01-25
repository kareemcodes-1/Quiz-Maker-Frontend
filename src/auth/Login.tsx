import { useEffect } from 'react'
import { useNavigate } from 'react-router';
// import { useStore } from '../../store/store';
import { useFormStatus } from 'react-dom';
// import Loading from '../components/loading';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setUserInfo } from '../slices/authSlice';
import { useLoginUserMutation } from '../slices/authApiSlice';
import Loader from '../components/ui/loading';

const SubmitBtn = () => {
  const {pending} = useFormStatus();
  return <button disabled={pending} type="submit" className="yena-btn-black dark:yena-btn text-white w-full">{pending ? <Loader /> : 'Sign in'}</button>
}

const Login = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const [loginUser] = useLoginUserMutation();

    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    }, [userInfo, navigate])



    const formAction = async (formData: any) => {
        try {
            const userData = {
                _id: '',
                role: 'user',
                name: '',
                avatar: '',
                email: formData.get('email'),
                password: formData.get('password'),
            }
    
            const res = await loginUser(userData).unwrap();
            if(res){
              dispatch(setUserInfo(res));
            }else{
                toast('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    
<div className="min-h-screen flex">
  <div className="flex flex-col justify-center w-full  px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-[2rem] font-semibold  flex items-center justify-center gap-[1rem]">
        Welcome back <img src="https://img.icons8.com/?size=100&id=LuXk2sw4rJVF&format=png&color=000000" alt="" className='w-[3rem] h-[3rem]'/>
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={formAction}>
        <div>
          <Label htmlFor="email" className="text-[1.1rem] font-medium">Email address</Label>
          <div className="mt-2">
            <Input  
               type="email"
              name="email"
              id="email"/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[1.1rem] font-medium">Password</Label>
            <div className="text-[.8rem]">
              <a
                href="#"
                className="text-[1rem] font-medium text-muted-foreground"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Input  
              type="password"
              name="password"
              id="password" 
            />
          </div>
        </div>

        <div>
          <SubmitBtn />
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Dont have an account?{' '}
        <a
          href="/register"
          className="font-semibold  underline text"
        >
          Sign up.
        </a>
      </p>
    </div>
  </div>
</div>

  )
}

export default Login;