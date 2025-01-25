import{ ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '../../layout'
// import { useStore } from '../../store/store'
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
// import Loading from '../../components/loading';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setUserInfo } from '../../slices/authSlice';
import Loader from '../../components/ui/loading';

const SubmitBtn = () => {

    const {pending} = useFormStatus();

    return (
      <button type="submit" disabled={pending} className='yena-btn --black lg:w-[10%] w-full'>{pending ? <Loader /> : 'Save'}</button>
    )
  }

const Profile = () => {

    const {userInfo} = useSelector((state: RootState) => state.auth);
    const [name, setName] =  useState<string>('');
    const [email, setEmail] =  useState<string>('');
    const [oldPassword, setOldPassword] =  useState<string>('');
    const [newPassword, setNewPassword] =  useState<string>('');
    const [imagePreview, setImagePreview] =  useState<string>('');
    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
            setImagePreview(userInfo.avatar);
        }
    }, [userInfo]);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if(file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                const image = fileReader.result;
                if(typeof image === "string"){
                    setImagePreview(image);
                }
            }
        }
    }


    const updateUser = async () => {
        const data = {
            name,
            email,
            avatar: imagePreview,
            password: newPassword,
            old_password: oldPassword
        }


        if(userInfo){
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/${userInfo._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
    
                if(res.ok){
                    const updatedUser = await res.json();
                    dispatch(setUserInfo(updatedUser));
                    setName('');
                    setEmail('');
                    setNewPassword('');
                    setOldPassword('');
                    setImagePreview('');
                    toast.success('Profile Updated');
                }else{
                    const error = await res.json();
                    toast.error(error.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
}


  return (
    <Layout>
        <div>
            <h1 className='text-[2.5rem] font-bold'>Settings</h1>
            <p className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</p>

            <form action={updateUser} className='flex flex-col gap-[1rem] mt-[2rem]'>

                  <div className='flex items-center gap-[1rem]'>
                      <img src={imagePreview ? imagePreview : userInfo?.avatar} alt={userInfo?.name} className='w-[8rem] h-[8rem] rounded-full'/>
                      <button type='button' className='yena-btn' onClick={() => ref.current?.click()}>Choose file</button>
                      <input type="file" ref={ref} name="avatar" id="avatar" className='hidden' onChange={handleImageChange}/>
                  </div>

                  <div className='flex flex-col'>
                       <Label htmlFor='name'>Name</Label>
                       <Input className='lg:w-1/2 mt-2' type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}/>
                  </div>

                  <div className='flex flex-col'>
                      <Label htmlFor='email'>Email</Label>
                       <Input className='lg:w-1/2 mt-2' type='email' name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div className='flex flex-col'>
                       <Label htmlFor='old-password'>Old Password</Label>
                       <Input className='lg:w-1/2 mt-2' type="password" name="old-password" id="old-password" onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}/>
                  </div>

                  <div className='flex flex-col'>
                      <Label htmlFor='new-password'>New Password</Label>
                       <Input className='lg:w-1/2 mt-2' type="password" name="new-password" id="new-password" onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}/>
                  </div>

                  <SubmitBtn />
            </form>
        </div>
    </Layout>
  )
}

export default Profile;



