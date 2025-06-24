"use client"

import { TrashIcon } from "@heroicons/react/24/outline";

import { useCurrentUserQuery } from "@/queries/user";
import deleteUserAction from "./actions";

export default function Settings() {
    
    const {data: me} = useCurrentUserQuery()

    return (
        <div id="settings" className="min-h-full md:border-x-[1px] px-6">
            <div className="pl-2 mt-2 flex justify-center">
                <button className="flex items-center text-red-600" onClick={() => deleteUserAction()}>
                    <div className="rounded-full"><TrashIcon className="size-6 m-2"></TrashIcon></div>
                    <span className="pl-1">Delete my account</span>
                </button>
            </div>
           
        </div>
    );
}
