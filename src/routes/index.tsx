import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental AI Sales Platform" },
      { name: "description", content: "Dental AI Sales Platform" },
      { property: "og:title", content: "Dental AI Sales Platform" },
      { property: "og:description", content: "Dental AI Sales Platform" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

// Blank starting page — content will be added here.
function Index() {
  return <div className="min-h-screen bg-background" />;
}