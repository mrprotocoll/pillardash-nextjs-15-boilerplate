import type { EffectCallback } from "react";
import { useEffect, useRef } from "react";

export default function useOnMountUnsafe(effect: EffectCallback) {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;
        return effect();
    }, [effect]);
}
