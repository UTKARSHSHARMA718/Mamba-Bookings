import { IconType } from "react-icons";

const ShowCountProperties = ({ propertyNames, countValue, icon: Icon, size }: { propertyNames: string, countValue: number, icon?: IconType, size?: number }) => {

    return (
        <div className='flex gap-2 items-center'>
            {!!Icon && <Icon size={size || 20} />}
            <div className='flex gap-1 items-center'>
                <p className='text-xs dark:text-slate-300 font-medium'>{countValue} </p>
                <p className='text-xs dark:text-slate-300 font-medium'>{propertyNames}</p>
            </div>
        </div>
    )
}

export default ShowCountProperties;