export async function convertHTMLToImage(
  html: string,
  filename: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.innerHTML = html;
      document.body.appendChild(container);

      // Get the first child element (the slide div)
      const element = container.firstElementChild as HTMLElement;

      if (!element) {
        throw new Error('No element found in HTML');
      }

      // Use html2canvas for better rendering
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(element, {
          scale: 2,
          backgroundColor: '#000000',
          logging: false,
          useCORS: true,
        }).then((canvas) => {
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob'));
              return;
            }

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            link.click();

            // Cleanup
            URL.revokeObjectURL(url);
            document.body.removeChild(container);
            resolve();
          }, 'image/png', 1.0);
        }).catch((error) => {
          document.body.removeChild(container);
          reject(error);
        });
      }).catch((error) => {
        document.body.removeChild(container);
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}
