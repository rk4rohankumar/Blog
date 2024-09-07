let errorCount = 0;

const errorCounter= (err, req, res, next) => {
    errorCount++; 
    console.error(err.stack); 
    res.status(404).send('Not Found');
}
export { errorCount };
export default errorCounter;