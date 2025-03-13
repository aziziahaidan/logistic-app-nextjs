"use client";
import SidebarIcon from "./SidebarIcon";
import BarchartIcon from '../icon/Barchart.json';
import AvatarIcon from "../icon/Avatar.json";
import BuildingIcon from "../icon/Building.json";
import PindropIcon from "../icon/Pindrop.json";
import ChequeIcon from '../icon/Cheque.json';
import TruckIcon from '../icon/Truck.json';
// import DocumentIcon from '../icon/Document.json';
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";


export const Sidebar = () => {

    const { isSignedIn } = useUser();


    const [active, setActive] = useState<string | null>(null);

    const updateSetActive = (label: string) => { setActive(label) }

    return (<>
        {isSignedIn &&
            <div className="hidden md:block bg-base-300 w-56 fixed top-0 left-0 bottom-0">
                <div className="flex flex-col justify-between h-full">

                    <ul className="menu">
                        <li>
                            <SidebarIcon
                                label="dashboard"
                                path={BarchartIcon}
                                loop={false}
                                hover={true}
                                active={active === 'dashboard'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                        <li>
                            <SidebarIcon
                                label="staff"
                                path={AvatarIcon}
                                loop={false}
                                hover={true}
                                active={active === 'staff'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                        <li>
                            <SidebarIcon
                                label="company"
                                path={BuildingIcon}
                                loop={false}
                                hover={true}
                                active={active === 'company'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                        <li>
                            <SidebarIcon
                                label="location"
                                path={PindropIcon}
                                loop={false}
                                hover={true}
                                active={active === 'location'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                        {/* <li>
                    <SidebarIcon
                        label="rate"
                        path={DocumentIcon}
                        loop={false}
                        hover={true}
                        active={active === 'rate'}
                        updateSetActive={updateSetActive}
                    />
                </li> */}
                        <li>
                            <SidebarIcon
                                label="shipment"
                                path={TruckIcon}
                                loop={false}
                                hover={true}
                                active={active === 'shipment'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                        <li>
                            <SidebarIcon
                                label="payment"
                                path={ChequeIcon}
                                loop={false}
                                hover={true}
                                active={active === 'payment'}
                                updateSetActive={updateSetActive}
                            />
                        </li>
                    </ul>
                    <SignedIn>
                        <div className="flex justify-center items-center min-h-screen">
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>

            </div>
        }
    </>
    )
}