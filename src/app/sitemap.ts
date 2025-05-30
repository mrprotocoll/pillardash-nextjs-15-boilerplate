import { MetadataRoute } from "next";

import CONSTANTS from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

// Define types for dynamic routes
type DynamicRoute = {
    slug: string;
    lastModified: Date;
};

type DynamicRoutesMap = {
    [key: string]: DynamicRoute[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = CONSTANTS.appUrl;

    // Static pages
    const staticPages = ["", ROUTES.home, ROUTES.login].filter(Boolean);

    // Sample dynamic data - replace with your actual data fetching
    const dynamicRoutes: DynamicRoutesMap = {
        blog: await getSampleBlogPosts(), // Example dynamic data
        products: await getSampleProducts(), // Additional dynamic route
    };

    // Static pages sitemap entries
    const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: page === "" ? 1 : 0.8,
    }));

    // Dynamic routes sitemap entries
    const dynamicEntries: MetadataRoute.Sitemap = Object.entries(dynamicRoutes).flatMap(
        ([routeType, items]) =>
            items.map((item) => ({
                url: `${baseUrl}/${routeType}/${item.slug}`,
                lastModified: item.lastModified,
                changeFrequency: "weekly" as const,
                priority: 0.7,
            }))
    );

    return [...staticEntries, ...dynamicEntries];
}

// Sample data fetching functions with proper typing
async function getSampleBlogPosts(): Promise<DynamicRoute[]> {
    // In a real app, you would fetch from your CMS or database
    return [
        {
            slug: "introducing-pillardash",
            lastModified: new Date("2024-05-01"),
        },
        {
            slug: "nextjs-boilerplate-guide",
            lastModified: new Date("2024-05-15"),
        },
    ];
}

async function getSampleProducts(): Promise<DynamicRoute[]> {
    // Example of another dynamic route
    return [
        {
            slug: "premium-template",
            lastModified: new Date("2024-04-20"),
        },
        {
            slug: "starter-kit",
            lastModified: new Date("2024-05-10"),
        },
    ];
}
