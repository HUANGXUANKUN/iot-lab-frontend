const getCurrentDataSet = (historical) => {
  let currentHistorical = historical.slice(
    Math.max(currentHistorical.length - TIME_UNITS, 0)
  );
  let currentDataSet = [
    {
      data: currentHistorical.map((set, index) => {
        const localDateTime = new Date(Number(set.lastModified)).toString();
        console.log(localDateTime);
        return [localDateTime, set.value];
      }),
    },
  ];
};

export {
    getCurrentDataSet,
}
