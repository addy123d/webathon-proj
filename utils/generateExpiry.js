const generateExpiry = (dates,duration,type)=>{
    if(type === "array"){
    const expiryDates = [];
    
    for(var i = 0 ;i < dates.length; i++){
        if(duration[i] === "Monthly"){
            const date = new Date(dates[i]);
            date.setDate(date.getDate() + 30);
            
            expiryDates.push(date.toISOString().split("T")[0]);
        }else{
            const date = new Date(dates[i]);
            date.setDate(date.getDate() + 365);
            
            expiryDates.push(date.toISOString().split("T")[0]);
        }
    }

    console.log(expiryDates);

    return expiryDates;
}else{
    if(duration === "Monthly"){
        const date = new Date(dates);
        date.setDate(date.getDate() + 30);
        
        return date.toISOString().split("T")[0];
    }else{
        const date = new Date(dates);
        date.setDate(date.getDate() + 365);
        
        return date.toISOString().split("T")[0];
    }
}

}

module.exports = generateExpiry;