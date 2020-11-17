const add = (prices)=>{
    let result = 0;
    for(var i = 0; i< prices.length; i++){
        result += Number(prices[i]);
    };

    return result;
}


const calculate = (details,price)=>{
    const prices = details.price;
    const paying_capacity = price;

    const added_result = add(prices);

    if(added_result > paying_capacity){
        return "Alert";
    }
        return "Normal";
};

module.exports = calculate;