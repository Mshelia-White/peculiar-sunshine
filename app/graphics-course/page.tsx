import type { Metadata } from "next";
import CoursePage from "./CoursePage";
import "./course.css";

const title = "Learn to Create Flyers & Carousels Using AI — Peculiar Sunshine";
const description =
  "A beginner-friendly course by Peculiar Sunshine. Think first, visualise second, use AI third — and create scroll-stopping flyers and carousels on your phone or laptop. Enrolment opens soon.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://www.peculiarsunshine.online"),
  alternates: { canonical: "/graphics-course" },
  openGraph: {
    title,
    description,
    url: "/graphics-course",
    siteName: "Peculiar Sunshine",
    type: "website",
    images: [{ url: "/course/og.jpg", width: 1200, height: 630, alt: "Learn to Create Flyers & Carousels Using AI — a course by Peculiar Sunshine" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/course/og.jpg"],
  },
};

export default function GraphicsCoursePage() {
  return <CoursePage />;
}
