export const formatMessageDateLong = (date) => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    } else if (isYesterday(inputDate)) {
        return (
            "昨日 " + 
            inputDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
            })
        );
    } else {
        return inputDate.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
}

export const formatMessageDateShort = (date) => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    } else if (isYesterday(inputDate)) {
        return "昨日";
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], { 
            month: '2-digit', 
            day: '2-digit'
        });
    } else {
        return inputDate.toLocaleDateString([], { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit'
        });
    }
}

export const isToday = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
}

export const isYesterday = (date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    return date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate();
}