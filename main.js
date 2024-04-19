const newsList = document.querySelector('.list')

const types = {
    increase: 'increase',
    decrease: 'decrease',
    unchanged: 'unchanged',
}

const fetchData = async () => {
    const response = await fetch('https://esfahanahan.com/api/news')
    const result = await response.json()
    console.log(result.data[2].related_name)
    console.log(result.data[1].related_price)

    // create a new list item for each news.
    result.data.map((news) => {
        createNewsItem(news)
    })
}

const createNewsItem = (news) => {
    if(!news.related_name) return
    const style = types[news.type]

newsList.innerHTML += 
    `<li class="list-item ${style}">
        <h2 class="item-name">${news.related_name}</h2>
        ${news.related_price && news.related_price !== '0'  
            ? `<p class="item-news">
                    <span class="persian-number">${news.related_price}</span>
                     تومان <img class="item-chart-icon ${news.type === 'increase' ? 'afzayeshi' : 'kaheshi'}" src="./assets/kaheshi.svg" alt="">
                    <span class="item-flow">${news.type === 'increase' ? 'افزایش' : 'کاهش'}</span> نسبت به دیروز
                </p>` 
            : `<p>بدون تغییر نسبت به دیروز</p>`}
    </li>`
}

const refreshNews = () => {
    newsList.innerHTML = ''
    fetchData()
}

fetchData()