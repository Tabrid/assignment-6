const url = `https://openapi.programming-hero.com/api/news/categories`;
fetch(url)
  .then(res => res.json())
  .then(data => displayCatagories(data.data.news_category))
  .catch(error => console.log(error))

const fatchCatagoryNews = (catagoryId, catagoryName) => {
  toggleSpinner(true);
  const sortField = document.getElementById('sortBtnTxt').innerText;
  const url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => dsiplayNews(data, catagoryName, sortField))
    .catch(error => console.log(error))
}

const fatchNewsDetails = newsId => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => newsDetailsModal(data))
    .catch(error => console.log(error))
}



const displayCatagories = catagories => {
    const newsCatagoriList = document.getElementById('newsCatagories');
    catagories.forEach(catagory => {
        const calagoryList = document.createElement('li');
        calagoryList.innerHTML = `
        <a onclick="fatchCatagoryNews('${catagory.category_id}', '${catagory.category_name}'); makeBtnActive('${catagory.category_id}', '${catagory.category_name}')" id="${catagory.category_id}" class="catagoryBtn hover:text-blue-600" href="#">${catagory.category_name}</a>
        `;
        newsCatagoriList.appendChild(calagoryList);
        makeBtnActive('01', 'Breaking News');
    })
}

const toggleSpinner = isLoding => {
    const loaderSection = document.getElementById('loadingSpinner');
    if (isLoding) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}

const makeBtnActive = (btnId, btnName) => {
    const activeBtn = document.getElementById(btnId);
    document.getElementById('trendingBtn').classList.remove('bg-blue-600');
    document.getElementById('trendingBtn').classList.add('text-blue-600');
    document.getElementById('todayPiBtn').classList.remove('bg-blue-600');
    document.getElementById('todayPiBtn').classList.add('text-blue-600');
    document.getElementById('newsContainer').classList.remove('hidden');
    document.getElementById('newsBtn').classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700', );
    document.getElementById('blogBtn').classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700', );
    document.getElementById('questionAccordion').classList.add('hidden');
    document.getElementById('filterSection').classList.remove('hidden');


    let el = activeBtn.parentElement.parentElement;
    for (let i = 0; i < el.children.length; i++) {
        let child = el.children[i];
        child.classList.add('text-blue-600');
        if (child.innerText != btnName) {
            child.classList.remove('text-blue-600');
        }
    }
}

const dateCal = getDate => {
    let date = new Date(getDate);
    let milliseconds = date.getTime();
    let d = new Date();
    d.setTime(milliseconds);
    return moment(d).format("ddd MMM DD, YYYY HH:mm:ss ");

}

const ratingView = rating => {
    let ratingArray = [];

    if (!Number.isInteger(rating) && !isNaN(rating) && rating != null) {
        let intRrating = Math.floor(rating);
        for (let i = 0; i < intRrating; i++) {
            ratingArray.push("<i class='fa-solid fa-star'></i>");
        }
        ratingArray.push("<i class='fa-solid fa-star-half-stroke'></i>");
        for (let i = 1; i < 5 - intRrating; i++) {
            ratingArray.push("<i class='fa-regular fa-star'></i>");
        }
        return ratingArray.join(' ');
    }
    else if (Number.isInteger(rating)) {
        for (let i = 0; i < rating; i++) {
            ratingArray.push("<i class='fa-solid fa-star'></i>");
        }
        return ratingArray.join(' ');
    }
    else if (isNaN(rating) || rating === null) {
        for (let i = 1; i <= 5; i++) {

            ratingArray.push("<i class='fa-regular fa-star'></i>");
        }
        return ratingArray.join(' ');

    }
}

const closeModal = () => {
    const modalContainer = document.getElementById('extralarge-modal');
    modalContainer.classList.add('hidden');
}

const newsDetailsModal = newsData => {
    const modalContainer = document.getElementById('extralarge-modal');
    //console.log(newsData.data);
    modalContainer.classList.remove('hidden');
    modalContainer.innerHTML = `
<div class="relative p-4 w-full md:h-auto">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow ">
        <!-- Modal header -->
        <div class="flex justify-between items-center p-5 rounded-t border-b ">
            <h3 class="text-xl font-medium text-gray-900 ">
                ${newsData.data[0].title}
            </h3>
            <button onclick="closeModal()" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="extralarge-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
        <img class="w-full" src="${newsData.data[0].image_url}" alt="">
        
        <div
        class="flex flex-wrap lg:flex-nowrap md:flex-nowrap items-center justify-between items-end">
        <div class="flex items-center mt-4">
            <img class="w-11 h-11 rounded-full mr-2"
                src="${newsData.data[0].author.img}"
                alt="Avatar of Jonathan Reinink">
                <div class="text-sm w-full">
                    <p class="text-lg capitalize font-medium leading-none">${newsData.data[0].author.name ? newsData.data[0].author.name : 'No Author'}</p>
                    <p class="text-gray-400">${dateCal(newsData.data[0].author.published_date)}</p>
                </div>
            </div>
            <div
                class="flex items-center mt-2 lg:mt-0 md:mt-0 justify-between lg:justify-between md:justify-evenly w-full lg:w-2/3 md:w-7/12">
                <div class="flex items-center">
                    <i class="fa-regular fa-eye text-2xl mr-1 text-gray-500"></i>
                    <p class="text-lg font-bold text-gray-500">${newsData.data[0].total_view ? newsData.data[0].total_view : '0'}</p>
                </div>
                <div id="ratingDiv" class="text-lg">
                    ${ratingView(newsData.data[0].rating.number)}
                </div>
                <div class="text-blue-600">
                <button
                    class="${newsData.data[0].others_info.is_todays_pick ? 'block' : 'hidden'} cursor-default text-white text-sm bg-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md px-3 py-2 text-center inline-flex items-center  mr-1">Today’s
                    Pick</button>
                <button
                    class="${newsData.data[0].others_info.is_trending ? 'block' : 'hidden'} cursor-default text-white text-sm bg-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md px-3 py-2 text-center inline-flex items-center ">Trending</button>
                </div>
            </div>
        </div>


            <p class="text-base leading-relaxed text-gray-500 ">
            ${newsData.data[0].details}
            </p>
        </div>
        <!-- Modal footer -->
        <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
            <button onclick="closeModal()"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Close</button>
        </div>
    </div>
</div>`
}

const sortTotal_view = (data) => {
    return data.sort((a, b) => (a.total_view > b.total_view) ? -1 : 1);
}

const sortTotal_rating = (data) => {
    return data.sort((a, b) => (a.rating.number > b.rating.number) ? -1 : 1);
}

const dsiplayNewsHTML = (data) => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.textContent = '';
    data.forEach(eachNews => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('mx-3', 'lg:mx-0', 'md:mx-3', 'mb-5');
        newsDiv.innerHTML = `
            <a onclick="fatchNewsDetails('${eachNews._id}')"
            class="flex p-4 hover:cursor-pointer max-w-full flex-col bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 " data-modal-toggle="extralarge-modal">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 lg:w-56 md:rounded-none md:rounded-lg lg:mr-4"
                src="${eachNews.thumbnail_url}" alt="">
            <div class="flex justify-around flex-col p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900  mb-4">${eachNews.title}</h5>
                <div>
                    <p class="mb-3 text-gray-400 text-lg ">${eachNews.details.split(" ", 100).join(' ')}...</p>
                </div >
        <div
            class="flex flex-wrap lg:flex-nowrap md:flex-nowrap items-center justify-between items-end">
            <div class="flex items-center mt-4">
                <img class="w-11 h-11 rounded-full mr-2"
                    src="${eachNews.author.img}"
                    alt="Avatar of Jonathan Reinink">
                    <div class="text-sm w-full">
                        <p class="text-lg capitalize font-medium leading-none">${eachNews.author.name ? eachNews.author.name : 'No Author'}</p>
                        <p class="text-gray-400">${dateCal(eachNews.author.published_date)}</p>
                    </div>
            </div>
            <div
                class="flex items-center mt-2 lg:mt-0 md:mt-0 justify-between lg:justify-between md:justify-evenly w-full lg:w-2/3 md:w-7/12">
                <div class="flex items-center">
                    <i class="fa-regular fa-eye text-2xl mr-1 text-gray-500"></i>
                    <p class="text-lg font-bold text-gray-500">${eachNews.total_view ? eachNews.total_view : '0'}</p>
                </div>
                <div id="ratingDiv" class="text-lg">
                    ${ratingView(eachNews.rating.number)}
                </div>
                <div class="text-3xl text-blue-600">
                    <i class="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div>
            </div >
        </a >
        `;
        newsContainer.appendChild(newsDiv);
        toggleSpinner(false);
    })
}

const dsiplayNews = (news, catagoryName, sortField) => {
    const newsContainer = document.getElementById('newsContainer');
    const catagoryNewsInfo = document.getElementById('catagoryNewsInfo');
    newsContainer.textContent = '';
    if (news.status) {
        catagoryNewsInfo.innerText = `${news.data.length} Items Found For Category ${catagoryName}`;
        if (sortField === 'Most View') {
            let data = sortTotal_view(news.data);
            dsiplayNewsHTML(data);
        }
        else if (sortField === 'Most Rating') {
            let data = sortTotal_rating(news.data);
            dsiplayNewsHTML(data);
        }
    }
    else {
        catagoryNewsInfo.innerText = `No Items Found For Category ${catagoryName}`;
        newsContainer.innerHTML = `<section class=" container mx-auto">
        <div class=" bg-white p-7">
            <p class="text-center text-2xl text-black font-medium">No News Items Found</p>
        </div>
    </section>`
        toggleSpinner(false);
    }

    document.getElementById('todayPiBtn').addEventListener('click', function () {
        this.classList.remove('text-blue-600');
        this.classList.add('bg-blue-600', 'text-white');
        document.getElementById('trendingBtn').classList.remove('bg-blue-600');
        document.getElementById('trendingBtn').classList.add('text-blue-600');
        let filterdData = [];
        news.data.forEach(eachNews => {
            if (eachNews.others_info.is_todays_pick) {
                filterdData.push(eachNews);
            }
        })
        if (filterdData.length == 0) {
            catagoryNewsInfo.innerText = `No Items Found For Category ${catagoryName}`;
            newsContainer.innerHTML = `<section class="container mx-auto">
            <div class=" bg-white p-7">
                <p class="text-center text-2xl text-black font-medium">No News Items Found</p>
            </div>
        </section>`
            toggleSpinner(false);
        }
        else {
            catagoryNewsInfo.innerText = `${filterdData.length} Items Found For Category ${catagoryName}`;
            newsContainer.innerHTML = `<section class="container mx-auto">
            <div class=" bg-white p-7">
                <p class="text-center text-2xl text-black font-medium">No News Items Found</p>
            </div>
        </section>`
            toggleSpinner(false);
            dsiplayNewsHTML(filterdData);
        }
    })

    document.getElementById('trendingBtn').addEventListener('click', function () {
        this.classList.remove('text-blue-600');
        this.classList.add('bg-blue-600', 'text-white');
        document.getElementById('todayPiBtn').classList.remove('bg-blue-600');
        document.getElementById('todayPiBtn').classList.add('text-blue-600');
        let filterdData = [];
        news.data.forEach(eachNews => {
            if (eachNews.others_info.is_trending) {
                filterdData.push(eachNews);
            }
        })
        if (filterdData.length == 0) {
            catagoryNewsInfo.innerText = `No Items Found For Category ${catagoryName}`;
            newsContainer.innerHTML = `<section class="container mx-auto">
            <div class=" bg-white p-7">
                <p class="text-center text-2xl text-black font-medium">No News Items Found</p>
            </div>
        </section>`
            toggleSpinner(false);
        }
        else {
            catagoryNewsInfo.innerText = `${filterdData.length} Items Found For Category ${catagoryName}`;
            newsContainer.innerHTML = `<section class="container mx-auto">
            <div class=" bg-white p-7">
                <p class="text-center text-2xl text-black font-medium">No News Items Found</p>
            </div>
        </section>`
            toggleSpinner(false);
            dsiplayNewsHTML(filterdData);
        }
    })

    document.getElementById('mostviewSortBtn').addEventListener('click', function () {
        const sortField = document.getElementById('dropdownDivider');
        const sortBtnTxt = document.getElementById('sortBtnTxt');
        dsiplayNewsHTML(sortTotal_view(news.data));
        sortBtnTxt.innerText = 'Most View';
        sortField.classList.add('hidden');
    })

    document.getElementById('mostratingSortBtn').addEventListener('click', function () {
        const sortField = document.getElementById('dropdownDivider');
        const sortBtnTxt = document.getElementById('sortBtnTxt');
        dsiplayNewsHTML(sortTotal_rating(news.data));
        sortBtnTxt.innerText = 'Most Rating';
        sortField.classList.add('hidden');
    })

}
fatchCatagoryNews('01', 'Breaking News');
document.getElementById('newsBtn').addEventListener('click', function() {
  this.classList.remove('hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
  this.classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');
  document.getElementById('blogBtn').classList.add('hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
  document.getElementById('blogBtn').classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');

  document.getElementById('questionAccordion').classList.add('hidden');
  document.getElementById('newsContainer').classList.remove('hidden');
  document.getElementById('filterSection').classList.remove('hidden');
  if (document.getElementById('catagoryNewsInfo').innerText === 'Answer Of Some Of Questions') {
    fatchCatagoryNews('01', 'Breaking News');
    makeBtnActive('01', 'Breaking News');

  }
})

document.getElementById('blogBtn').addEventListener('click', function() {
  this.classList.remove('hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
  this.classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');

  document.getElementById('newsBtn').classList.add('hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
  document.getElementById('newsBtn').classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');

  const newsContainer = document.getElementById('newsContainer');
  newsContainer.classList.add('hidden');
  document.getElementById('questionAccordion').classList.remove('hidden');
  document.getElementById('filterSection').classList.add('hidden');
  document.getElementById('catagoryNewsInfo').innerText = `Answer Of Some Of Questions`;
})
