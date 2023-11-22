
let divContent = document.querySelector('#content')

let ids = [];

let page = 1;
function getProducts(page) {
    fetch(`https://api.digikala.com/v1/categories/headphone/search/?has_selling_stock=1&sort=7&page=${page}`).then(res => res.json()).then(res => {
        let products = res.data.products
        products.map(product => {
            fetch(`https://api.digikala.com/v2/product/${product.id}/`).then((res) => res.json()).then(res => {
                let galleries = res.data.product.images.list;
                galleries.map(function (item) {
                    let aTag = document.createElement('a');
                    let img = document.createElement('img');
                    aTag.href = item.webp_url[0],
                    aTag.download = item.webp_url[0]
                    img.src = item.webp_url[0]
                    img.width = 300
                    img.height = 300
                    aTag.appendChild(img)
                    aTag.click()
                    divContent.append(aTag)
                })
            });
        })
    })
    
}

document.querySelector('#loadmore').addEventListener('click', (e) => {
    getProducts(page)
    page++
})

window.getProducts = getProducts;

function detectColor(imageUrl, targetColor) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log(imageData);
      const data = imageData.data;

      // Loop through pixel data (each pixel has 4 values: red, green, blue, alpha)
      for (let i = 0; i < data.length; i += 4) {
        const pixelColor = `#${("000000" + rgbToHex(data[i], data[i + 1], data[i + 2])).slice(-6)}`;

        // Check if the pixel color matches the target color
        if (pixelColor === targetColor) {
          console.log('Color found at position:', i / 4, 'Color:', pixelColor);
          // You can add your logic here for further actions
        }
      }
    };
  }

  detectColor('https://dkstatics-public.digikala.com/digikala-products/0e2fd13ac3edf9cbafe3eabc1ec0dddb92c2e64d_1700501672.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90', '#333333')