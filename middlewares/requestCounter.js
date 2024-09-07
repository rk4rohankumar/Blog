let requestCount = 0;

const requestCounter = (req, res, next) => {
    requestCount++;
    console.log('Request Count:', requestCount);
    next();
};

export default requestCounter;
export { requestCount };