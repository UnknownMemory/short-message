interface Props {
    name: string,
    value?: string,
    type: string,
    error: string[] | undefined
}

export const FormInput = ({name, value, type, error}: Props) => {
    return (
        <div className="w-full">
            {error ? <p className="md:text-sm text-red-600">{error}</p> : ''}
            <input className="input-light mb-2 md:mb-4 p-2 w-full rounded" type={type} name={name} placeholder={name} value={value}/>
        </div>
    )
}
