"use client";
import { useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    TrashIcon,
    SwatchIcon,
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

import { useCurrentUserQuery } from "@/queries/user";
import deleteUserAction from "./actions";

export default function Settings() {
    const { data: me } = useCurrentUserQuery();
    const router = useRouter();

    return (
        <div id="settings" className="min-h-full md:border-x-[1px] ">
            <nav className="grid grid-cols-3 w-full h-14 border-b-[1px]">
                <div className="self-center ml-4">
                    <button type="button" onClick={router.back}>
                        <ArrowLeftIcon className="size-5 inline"></ArrowLeftIcon>
                    </button>
                    <div className="md:text-lg md:col-span-1 inline md:ml-4">Settings</div>
                </div>
            </nav>

            <div className="pl-2 mt-2 flex justify-center">
                <button className="flex items-center text-red-600" onClick={() => deleteUserAction()}>
                    <div className="rounded-full">
                        <TrashIcon className="size-6 m-2"></TrashIcon>
                    </div>
                    <span className="pl-1">Delete my account</span>
                </button>
            </div>
        </div>
    );
}
