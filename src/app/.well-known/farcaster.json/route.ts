export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjIzNTAyNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEQwODA0NTdiRjIwMUJiQjcxNDUwNTU4OEQ4ODI1ZTJDZjRhYjgwNDAifQ",
      payload: "eyJkb21haW4iOiI3NzMzLTI2MDEtMjQ4LTRmMDAtYWFiMC0xMTg0LWViNjEtOTczMC0xZGIwLm5ncm9rLWZyZWUuYXBwIn0",
      signature: "MHhjYTgzNzgwYjU2ZGQwNTQ1NTBhZGFmMGYyYWE3YTQ3ODVlODViOTY1OWZmZTlkMmNiMzU4YmIzZWMxNGFkNzY2NTI3OThlYjM5OTkyZTg2M2IxMjY0YzFiNTNhZTA2ZDg2ODAyYjE1OGI1YzY0YzQ1OGVkYjc5YzgzZTQ1MmE0MzFj"
    },
    frame: {
      version: "1",
      name: "Don Da Degen Dog",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: "https://frames-v2-demo-main-main.vercel.app",
      imageUrl: `${appUrl}/frame-cast.png`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/icon.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${appUrl}/api/webhook`
    }
  };

  return Response.json(config);
}
