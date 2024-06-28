
document.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('like-btn')) {
        const productId = element.getAttribute('product-id')
        updateWishList(productId, element)
    }
})

async function updateWishList(id, btn) {
    try {
        const res = await axios.get(`/products/${id}/like`,
            { headers: { 'X-Requested-With': 'XMLHttpRequest' } },
        );

        if(btn.classList.contains('fa-regular')){
            btn.classList.remove('fa-regular');
            btn.classList.add('fa-solid');
        }
        else{
            btn.classList.add('fa-regular');
            btn.classList.remove('fa-solid');
        }
    }
    catch (error) {
        window.location.replace('/login');
    }

}