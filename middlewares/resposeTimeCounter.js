const responseTimeChecker = (req, res, next) => {
    const startTime = new Date().getTime();

    res.on('finish', () => {
        const endTime = new Date().getTime();
        const responseTime = endTime - startTime;
        console.log('Response Time:', responseTime, 'ms');
    });

    next();
};

export default responseTimeChecker;
