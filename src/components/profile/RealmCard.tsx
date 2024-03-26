import { useContext } from "react"

import { AppContext } from "@/providers/AppContextProvider";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "./DynamicIcon";
import Link from "next/link";

export const RealmCard = ({ atomicalId, links, subrealmName, imageData }: { atomicalId?: string, links?: any, subrealmName?: string, imageData: string }) => {
    const { tlr } = useContext(AppContext)

    const atomicalsNumber = 200000; // to be changed for line 26

    return atomicalId?.startsWith('fake-skeleton') ? (
        <Skeleton className="h-[176px] w-full " />
    ) : (
        <Card className={`hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`}>
            <CardHeader className="p-2 pb-0" >
                <ImageFromData additionalClass="w-full rounded-lg" imageData={imageData} />
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">
                        <a href={`/profil/${subrealmName}`} target="_blank">{subrealmName}</a>
                    </CardTitle>
                    <div className="text-sm text-slate-400">#{atomicalsNumber.toLocaleString('en')}</div>
                </div>
            </CardHeader>
            <CardFooter className="p-2 gap-4 ">
                <Link className="bg-border p-1.5 rounded-md hover:scale-95" href={`/profil/${tlr}.${subrealmName}`} target="_blank">
                    <DynamicIcon type="person" />
                </Link>
                {
                    (links && (links.x || links.twitter)) ? (
                        <Link className="bg-border p-1.5 rounded-md hover:scale-95" href={links.x || links.twitter} target="_blank">
                            <DynamicIcon type="x" url={links.x || links.twitter} />
                        </Link>
                    ) : (
                        <></>
                    )
                }
            </CardFooter>
        </Card>
    )
}