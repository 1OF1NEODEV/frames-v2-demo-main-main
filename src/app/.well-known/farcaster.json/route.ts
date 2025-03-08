export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjIzNTAyNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEQwODA0NTdiRjIwMUJiQjcxNDUwNTU4OEQ4ODI1ZTJDZjRhYjgwNDAifQ",
      payload: "eyJkb21haW4iOiJkb250aGVkb2cudmVyY2VsLmFwcCJ9",
      signature:
        "MHg2NGEwNjIxNmVkYmYzMjdmYjAyMmFjZDhiYjA0Yjg2ZTI0NmJjOTY4NzQxZjYyYzgwNTQ3N2YxNmViZmE3M2E4N2I2MzJmOWFhZTM2Y2E5NDNjN2RiMzkzNjJjMTgzNWU2NzI0NzMwYzQ0YTQ5ZmJkNzdlYWUyNjljMTkyOWUzODFi",
    },
    frame: {
      version: "1",
      name: "Don The Dog",
      iconUrl: `${appUrl}/COMING SOON (2).png`,
      homeUrl: "https://donthedog.vercel.app/",
      imageUrl: `${appUrl}/frame-cast.png`,
      buttonTitle: "Launch Don",
      splashImageUrl: `${appUrl}/COMING SOON (2).png`,
      splashBackgroundColor: "#2A69F7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
