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
            const res = await logoutUser('');
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
    <div className='flex items-center gap-[1rem]'>
    <div className=" relative">
        <button onClick={() => setOpenThemeSelect(!openThemeSelect)}
          className="inline-flex relative items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9 scale-95 rounded-full"
          type="button"
          id="radix-:rgk:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <svg
            style={{ width: "1.5rem", height: "1.5rem" }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-sun size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-moon absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </button>

        <Select open={openThemeSelect} onOpenChange={(open) => setOpenThemeSelect(open)} onValueChange={(value: Theme) => setTheme(value)}> {/* No need for `onOpenChange` unless tracking state */}
  
      <SelectContent className="absolute top-[2.5rem] lg:left-[77.5rem] left-[15rem]">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>

      </div>

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
    </div>
  )
}

export default Navbar