const logFormatter = (line) => {
    const date = line.split('  ')[0].split(' ')[0];
    const logType = line.split('  ')[0].split(' ')[1]
    const warningMessage = line.split('  ')[1];
    return { date, logType, warningMessage };
}

module.exports = {
    logFormatter
};
