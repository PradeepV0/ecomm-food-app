import React, { useContext, useEffect, useState } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {

    const { productList } = useContext(StoreContext);
    const [catogeryList,setCatogeryList] = useState({})

    useEffect(()=>{
        getMenuList()
        // eslint-disable-next-line
    },[productList])

    const getMenuList = () =>{
        if(productList.length > 0){
            const catageryLs =    productList.reduce((acc, item) => {
                const category = item.category;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
                return acc;
            }, {});
            setCatogeryList(catageryLs);
            
        }
    }



    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>
                Choose from a diverse menu featuring a delectable array of dishes crafted with the
                finest ingredients and culinary expertise. Our Mission is to satisfy
                your cravings and elevate your experience, one delicious meal at a time.
            </p>
            <div className='explore-menu-list'>
                {Object.keys(catogeryList).length > 0 && Object.entries(catogeryList).map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item[0] ? "All" : item[0])}
                            key={index}
                            className='explore-menu-list-item'>
                            <img className={category===item[0] ? "active" : ""} src={item[1][1].image} alt='' />
                            <p>{item[0]}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu