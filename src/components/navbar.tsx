import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, useNavigate } from 'react-router';
import { useLogoutUserMutation } from '../slices/authApiSlice';
import { logout } from '../slices/authSlice';
import { Theme, useTheme } from "../providers/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const Navbar = () => {
    const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
    const { userInfo } = useSelector((state:RootState) => state.auth);
    const [openThemeSelect, setOpenThemeSelect] = useState<boolean>(false);
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setTheme } = useTheme();

    async function Logout (){
        try {
            const res = await logoutUser();
            if(res){
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='absolute right-[2rem] top-[.5rem]'>

<Select open={openThemeSelect} onOpenChange={(open) => setOpenThemeSelect(open)} onValueChange={(value: Theme) => setTheme(value)}> {/* No need for `onOpenChange` unless tracking state */}
  
  <SelectContent className="absolute lg:right-[-77rem] left-[12.5rem] top-[3.8rem]">
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

        <button
          type="button"
          onClick={() => setOpenProfileMenu(!openProfileMenu)}
        >
          <img
            src={userInfo?.avatar}
            alt={userInfo?.name}
            className="w-[1.5rem] h-[1.5rem] rounded-full relative"
          />
        </button>

        {openProfileMenu && (
          <div className="absolute right-0 top-[2rem] mt-2 w-[10rem] bg-white dark:bg-[#0f172a] border  rounded-lg shadow-lg z-50">
            <ul className="flex flex-col text-[.925rem]">
              <Link to="/settings/profile" className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer">
                 Profile
              </Link>
              <Link to="/settings" className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer">
                 Settings
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer"
                onClick={Logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
    </div>
  )
}

export default Navbar