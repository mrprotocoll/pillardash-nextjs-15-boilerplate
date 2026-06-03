import Image from "next/image";

import LogoImg from "@public/logo.svg";

export default function Logo() {
    return <Image src={LogoImg} alt='Pillardash Logo' width={100} height={20} priority />;
}
