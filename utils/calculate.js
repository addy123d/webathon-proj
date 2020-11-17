const add = (prices)=>{
    let result = 0;
    for(var i = 0; i< prices.length; i++){
        result += Number(prices[i]);
    };

    return result;
}


const calculate = (details,price,duration)=>{
    const prices = details.price;
    const paying_capacity = price;

    const added_result = add(prices);
    if(duration === "Yearly"){
        let difference = Number(paying_capacity/12) - added_result; 
        if(added_result > Number(paying_capacity/12)){
            return ["Alert",difference];
        }
            return ["Normal",difference];
    }else{
        let difference = Number(paying_capacity) - added_result; 
        if(added_result > Number(paying_capacity)){
            return ["Alert",difference];
        }
            return ["Normal",difference];  
    }


};

module.exports = calculate;