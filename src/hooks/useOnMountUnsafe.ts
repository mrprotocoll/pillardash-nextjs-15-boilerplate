import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export default function useOnMountUnsafe(effect: EffectCallback) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            effect();
        }
    }, [effect]);
}
