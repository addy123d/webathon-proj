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
        if(added_result > Number(paying_capacity/12)){
            return "Alert";
        }
            return "Normal";
    }else{
        if(added_result > Number(paying_capacity)){
            return "Alert";
        }
            return "Normal";  
    }


};

module.exports = calculate;