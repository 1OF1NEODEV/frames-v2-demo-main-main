import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/frame-cast.png`,
  button: {
    title: "Launch App",
    action: {
      type: "launch_frame",
      name: "Don Da Degen Dog",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#ffffff",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Don Da Degen Dog",
    openGraph: {
      title: "Don Da Degen Dog",
      description: "Let Me See That $DON!",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}
