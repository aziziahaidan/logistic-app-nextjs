"use client";
import SidebarIcon from "./SidebarIcon";
import BarchartIcon from '../icon/Barchart.json';
import AvatarIcon from "../icon/Avatar.json";
import BuildingIcon from "../icon/Building.json";
import PindropIcon from "../icon/Pindrop.json";
import ChequeIcon from '../icon/Cheque.json';
import TruckIcon from '../icon/Truck.json';
import DocumentIcon from '../icon/Document.json';
import { useState } from "react";


export const Sidebar = () => {

    const [active, setActive] = useState<string | null>(null);

    const updateSetActive = (label: string) => { setActive(label) }

    return (
        <>
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
                <li>
                    <SidebarIcon
                        label="rate"
                        path={DocumentIcon}
                        loop={false}
                        hover={true}
                        active={active === 'rate'}
                        updateSetActive={updateSetActive}
                    />
                </li>
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
            

        </>
    )
}