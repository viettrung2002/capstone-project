import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite/**/*.js",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sf: ["var(--font-sf)"],
                qs: ["var(--font-quicksand)"],
                fre: ["var(--font-fre)"],
                'sf-compact': ["var(--font-sf-compact)"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'cl-text': "var(--color-text)",
                'cl-hover-text' : "var(--color-cl-hover-text)",
                'cl-button-text' : "var(--color-cl-button-text)",

            },

        },
    },
    plugins: [],
} satisfies Config;
