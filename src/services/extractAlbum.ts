export async function extractAlbum(url: string): Promise<any> {
  return {
    status: "ok",
    url,
    images: []
  };
}
