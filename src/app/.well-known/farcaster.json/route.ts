export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjIzNTAyNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEQwODA0NTdiRjIwMUJiQjcxNDUwNTU4OEQ4ODI1ZTJDZjRhYjgwNDAifQ",
      payload: "eyJkb21haW4iOiJmcmFtZXMtdjIudmVyY2VsLmFwcCJ9",
      signature:
        "MHhjZjYyYjczYTFlZjA4NTBmNDU0MTk3ODAzMTliMzFkZjViYWY4YzY1MjkzYTcxNzA1NmNiYzY2NWRhMTlhN2EyNDYxZjY0ODExMDBkNWNmZDMzNTUxYzkzZTEyZDFmMWE1NGMyMDYyNGNlODE0NDgzMTgzNjRlY2Y3Y2EzMGQ1ZDFj",
    },
    frame: {
      version: "1",
      name: "Don Da Degen Dog",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: "https://frames-v2-demo-main-main.vercel.app",
      imageUrl: `${appUrl}/frame-cast.png`,
      buttonTitle: "Launch App",
      splashImageUrl: `${appUrl}/icon.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
