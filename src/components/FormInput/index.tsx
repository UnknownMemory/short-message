
interface Props {
    name: string,
    type: string,
    error: string[] | undefined
}

export const FormInput = ({name, type, error}: Props) => {
    return (
        <div className="w-full">
            <p className="md:text-sm text-red-600">{error}</p>
            <input className="md:mb-4 text-black w-full" type={type} name={name} placeholder={name}/>
        </div>
    )
}
