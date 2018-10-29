function getArrayDate(date) {
  let daysNumber = 30;
  let arrayDate = [];

  while (daysNumber--) {
    arrayDate.push({
      text: `${date.date()} ${date.format('dd')}`,
      value: date.format("YYYY-MM-DD")
    });

    date.add(1, 'd');
  }

  return arrayDate;
}

export default getArrayDate;
