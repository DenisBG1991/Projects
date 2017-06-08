// function applyForVisa(documents) {
//     console.info("Обработка заявления...");
//     return new Promise((resolve, reject) =>
//         setTimeout(() => Math.random() > .5 ? resolve({}) : reject(`Не хватило документов: ${documents}`), 3000)
//     );
// }
//
// function getVisa(visa) {
//     console.info("Виза получена!");
//     return visa;
// }
//
// function bookHotel(visa) {
//     console.info(visa);
//     console.info("Бронируем отель...");
//     return {};
// }
//
// function buyTickets(booking) {
//     console.info("Бронь: ", booking);
//     console.info("Покупаем билеты...");
// }
//
// applyForVisa({})
//     .then(getVisa)
//     .then(bookHotel)
//     .then(buyTickets)
//     .catch(error => console.error(error));

function applyForVisa(documents) {
    console.info("Обработка заявления...");
    return new Promise((resolve, reject) =>
        setTimeout(() => {
        let visa = {
            visa: "Виза"
        };
        Math.random() > .5 ? resolve(visa) : reject("Не хватило документов: ", documents);
        }, 3000)
    );
}

function getVisa(visa) {
    console.info("Виза получена: ", visa);

    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(visa), 2000);
    });

    //return Promise.resolve(visa);
}

function bookHotel(visa) {
    console.info("Бронируем отель...");

    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let booking = {
                    booking: "Бронь в отеле"
                },
                documents = [visa, booking];
            resolve(documents);
        }, 2000);
    });

    //return Promise.reject("Нет мест.");

    // let booking = {
    //     booking: "Бронь в отеле"
    // },
    //     documents = [visa, booking];
    // return Promise.resolve(documents);
}

function buyTickets(documents) {
    console.info("Бронь: ", documents[1]);
    console.info("Покупаем билеты...");

    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let tickets = {
                tickets: "Билеты"
            };
            documents.push(tickets);
            resolve(documents);
        }, 2000);
    });

    // let tickets = {
    //     tickets: "Билеты"
    // };
    // documents.push(tickets);
    // return Promise.resolve(documents);
}

function documentsReady(documents) {
    console.info("Все документы собраны:", documents, ",можно отправляться в путешествие!!!");
}

let documents = {
    passport: "Паспорт"
};

applyForVisa(documents)
    .then(getVisa)
    .then(bookHotel)
    .then(buyTickets)
    .then(documentsReady)
    .catch(error => console.error(error));