import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/frame-cast.png`,
  button: {
    title: "Launch Don App",
    action: {
      type: "launch_frame",
      name: "Don The Dog",
      url: appUrl,
      splashImageUrl: `${appUrl}/updated logo.png`,
      splashBackgroundColor: "#2A69F7",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Don The Dog",
    openGraph: {
      title: "Don The Dog",
      description: "Coolest Degenerate Pixel Dog on Base.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
