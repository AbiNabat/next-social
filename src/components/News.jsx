"use client"
import React, {useEffect, useState} from 'react';

const News = () => {
    const  [news, setNews] =useState([]);
    const [articlesNum, setArticlesNum] = useState(3);
    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/everything/cnn.json')
            .then(res => res.json())
            .then(data => setNews(data.articles));
    }, []);
    return (
        <>
            {news.slice(0, articlesNum).map((item, i) => (
                <div key={i} className=''>
                   <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200'>
                       <div className='space-y-0.5'>
                           <h2 className='text-lg font-semibold'>{item.title}</h2>
                           <p className='text-sm font-medium text-gray-500'>{item.description}</p>
                       </div>
                       <img src={item.urlToImage} width={70} className='rounded-xl' alt='image' />
                   </div>
                </div>
            ))};

            <button onClick={() => setArticlesNum(articlesNum + 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400 text-sm'>Load More</button>
        </>
    );
};

export default News;