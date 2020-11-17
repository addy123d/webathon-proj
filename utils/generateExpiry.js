const generateExpiry = (dates,duration)=>{
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

}

module.exports = generateExpiry;