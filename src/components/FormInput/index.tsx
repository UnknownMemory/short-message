interface Props {
    name: string,
    type: string,
    error: string[] | null
}

export const FormInput = ({name, type, error}: Props) => {
    return (
        <div className="w-full">
            {error ? <p className="md:text-sm text-red-600">{error}</p> : ''}
            <input className="input-light mb-2 md:mb-4 p-2 w-full rounded" type={type} name={name} placeholder={name}/>
        </div>
    )
}
