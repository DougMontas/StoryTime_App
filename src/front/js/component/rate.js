import React, { useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faHeart, faStar } from '@fortawesome/free-solid-svg-icons'




const Rate = ({count, rating, color, onRating}) => {
    const[hoverRating, setHoverRating] = useState(0)

    const getColor = index => {
        if(hoverRating >= index){
            return color.filled
        }else if (!hoverRating && rating >= index) {
            return color.filled
        }
        return color.unfilled
    }

    const starRating = useMemo(() => {
        return Array(count)
        .fill(0)
        .map((_, i) => i + 1)
        .map((idx) => (
            <FontAwesomeIcon 
                key={idx}
                className="cursor-pointer"
                icon = {faHeart}
                onClick={()=> onRating(idx)}
                style={{color: getColor(idx)}}
                onMouseOver={() => setHoverRating(idx)}
                onMouseLeave={() => setHoverRating(0)}                
            />
            
        ))
    }, [count, rating, hoverRating])
    
    return (
        <div>

        {starRating}
        {/* <Rate /> */}

        </div>
    )

}

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string
    },
};

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "DCDCDC"
        
    },
};

export default Rate