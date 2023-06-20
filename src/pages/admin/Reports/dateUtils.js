
export function startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    return new Date(date.setDate(diff));

}

//dt = new Date(); 

//console.log(startOfWeek(dt).toString());

export function startOfMonth(date) {

    return new Date(date.getFullYear(), date.getMonth(), 1);

}

//dt = new Date(); 

//console.log(startOfMonth(dt).toString());


export function startOfYear(date) {

    return new Date(date.getFullYear(), 0, 1);

}


export function startOflastYear(date) {

    return new Date(date.getFullYear()-1, date.getMonth(), 1);

}

export function endOfWeek(date) {

    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));

}