import puppeteer from 'puppeteer';

export async function extractAlbum(url: string): Promise<{ images: string[] }> {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Espera que las imágenes estén cargadas en el DOM
  await page.waitForSelector('img');

  // Extrae los src de las imágenes visibles
  const imageUrls = await page.$$eval('img', imgs =>
    imgs.map(img => img.getAttribute('src')).filter(src => !!src)
  );

  await browser.close();

  return {
    images: imageUrls as string[]
  };
}
