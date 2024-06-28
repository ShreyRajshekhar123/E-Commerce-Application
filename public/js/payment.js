// console.log('connected!')
const buyButton = document.querySelector('#buy-btn');

buyButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const amount = document.querySelector('#amount').innerText.split(' ').pop();
    makePayment(amount*100);
})

async function makePayment(amount){
    try {
        const res = await axios({
            method:'post',
            url: '/order',
            data: {amount},
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })
    
        const  options = {
            "key": "rzp_test_8wvQsvdLHaDloc",
            "amount": amount,
            "name": "Ecommerce",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.order.id, 
            "callback_url": "/verify-payment",
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
    
        var rzp1 = new Razorpay(options);
        rzp1.open(); 
    } 
    catch (error) {
       window.location.replace('/login'); 
    }
}

