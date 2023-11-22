
let divContent = document.querySelector('#content')

let ids = [];

let page = localStorage.getItem('page') ?? 1;

function getProducts(page) {
    fetch(`https://api.digikala.com/v1/categories/casual-shoes-for-men/search/?has_selling_stock=1&page=${page}`).then(res => res.json()).then(res => {
        let products = res.data.products
        products.map(product => {
            fetch(`https://api.digikala.com/v2/product/${product.id}/`).then((res) => res.json()).then(res => {
                let galleries = res.data.product.images.list;
                galleries.map(function (item) {
                    let match = item.webp_url[0].match(/_(\d+)\.jpg/);
                    if (match && match[1] >= 1700539200) {
                        let img = document.createElement('img');
                        img.src = item.webp_url[0]
                        img.width = 300
                        img.height = 300
                        divContent.append(img)
                    } else {
                        console.log('digikala.com' + res.data.product.url.uri)
                    }
                })
            });
        })
    })
    
}

document.querySelector('#loadmore').addEventListener('click', (e) => {
    getProducts(page)
    localStorage.setItem('page', page++)
})

window.getProducts = getProducts;