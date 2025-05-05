interface Props {
    name: string,
    defaultValue?: string,
    type: string,
    error: string[] | undefined
}

export const FormInput = ({name, defaultValue, type, error}: Props) => {
    return (
        <div className="w-full">
            {error ? <p className="md:text-sm text-red-600">{error}</p> : ''}
            <input className="sm-input mb-2 md:mb-4 p-2 w-full rounded" type={type} name={name} placeholder={name} defaultValue={defaultValue}/>
        </div>
    )
}
