
import { useNavigate } from 'react-router';
import { useFormStatus } from 'react-dom';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label'
import { useRegisterUserMutation } from '../slices/authApiSlice';
import { setUserInfo } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const SubmitBtn = () => {
  const {pending} = useFormStatus();
  return <button disabled={pending} type="submit" className="yena-btn-black dark:yena-btn text-white w-full">Sign up</button>
}

const Register = () => {
    let navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();
    const dispatch = useDispatch();

    // const {setUserInfo} = useStore();

    const formAction = async (formData: any) => {
        try {
            const userData = {
              _id: '',
              role: 'user',
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                avatar: '',
            }
    
           const res = await registerUser(userData).unwrap();

            if(res){
                dispatch(setUserInfo(res));
                navigate('/');
            }else{
                // console.log()
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
<div className="min-h-screen flex">
  <div className="flex flex-col justify-center w-full px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-[2rem] font-semibold  flex items-center justify-center gap-[1rem]">
       Create account <img src="https://img.icons8.com/?size=100&id=LuXk2sw4rJVF&format=png&color=000000" alt="" className='w-[3rem] h-[3rem]'/>
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={formAction}>

      <div>
          <Label
            htmlFor="name"
           className="text-[1.1rem] font-medium"
          >
            Name
          </Label>
          <div className="mt-2">
             <Input  
              type="text"
              name="name"
              id="name" 
            />
          </div>
        </div>

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
            <div className="text-sm">
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
      Already have an account?{' '}
        <a
          href="/login"
          className="font-semibold underline"
        >
          Sign in.
        </a>
      </p>
    </div>
  </div>
</div>
  )
}

export default Register;