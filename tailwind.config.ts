import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "1.5rem",
                lg: "2rem",
            },
            screens: {
                "2xl": "1300px",
            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                tertiary: "var(--tertiary)",
                dark: "var(--dark)",
            },
            boxShadow: {
                subtle: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                "deep-shadow": "0 10px 25px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
} satisfies Config;
