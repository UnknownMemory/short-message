

interface Props {
    postId: number,
    setIsOpen: Function
}

export const Tooltip = ({postId, setIsOpen}: Props) => {
    return (
        <div className="absolute z-20 top-full right-0 md:top-6  md:p-2 min-w-max bg-black border-sm-border-dark border-[0.2px] rounded-md text-sm" onClick={() => setIsOpen(false)}>
            <div className="inline w-full text-red-600">Delete post</div>
        </div>
    )
}
