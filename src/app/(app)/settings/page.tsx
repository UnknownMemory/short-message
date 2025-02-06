"use client"

import { getCurrentUser } from "@/utils/service";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import deleteUserAction from "./actions";




export default function Settings() {
    const qClient = useQueryClient()
    
    const {data: me} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        initialData: () => {
            return qClient.getQueryData(['me'])
        },
        staleTime: Infinity,
    })

    return (
        <div id="settings" className="min-h-full border-x-[1px]">
            <div className="pl-2 mt-2 flex justify-center">
                <button className="flex items-center text-red-600" onClick={() => deleteUserAction()}>
                    <div className="rounded-full"><TrashIcon className="size-6 m-2"></TrashIcon></div>
                    <span className="pl-1">Delete my account</span>
                </button>
            </div>
           
        </div>
    );
}
