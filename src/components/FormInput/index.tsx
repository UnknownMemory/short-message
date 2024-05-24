interface Props {
    name: string,
    type: string,
    error: string[] | null
}

export const FormInput = ({name, type, error}: Props) => {
    return (
        
        <div className="w-full">
            {error ? <p className="md:text-sm text-red-600">{error}</p> : ''}
            <input className="md:mb-4 md:p-2 text-black w-full rounded" type={type} name={name} placeholder={name}/>
        </div>
    )
}
